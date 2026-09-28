$ErrorActionPreference = 'Stop'

$workspace = $PSScriptRoot
if (-not $workspace) { $workspace = Get-Location }
$themeRoot = Join-Path $workspace 'wordpress-theme\speego-logistics'
$exploreRoot = Join-Path $workspace 'explore'
$artifactRoot = Join-Path $workspace 'artifacts'
$buildRoot = Join-Path $workspace 'public'

Write-Host "Starting build & packaging for SpeeGo Logistics WordPress Theme..." -ForegroundColor Cyan

# 1. Run build if prepare-vercel.js exists
if (Test-Path (Join-Path $workspace 'prepare-vercel.js')) {
    Push-Location $workspace
    try {
        & node prepare-vercel.js
        if ($LASTEXITCODE -ne 0) { throw 'Build step failed.' }
    } finally {
        Pop-Location
    }
}

# 2. Sync explore home templates
$homeTemplates = Join-Path $exploreRoot 'pages\home'
New-Item -ItemType Directory -Path $homeTemplates -Force | Out-Null
if (Test-Path (Join-Path $workspace 'scratch\vi_home_sections.html')) {
    Copy-Item (Join-Path $workspace 'scratch\vi_home_sections.html') (Join-Path $homeTemplates 'vi-home.html') -Force
    Copy-Item (Join-Path $workspace 'scratch\en_home_sections.html') (Join-Path $homeTemplates 'en-home.html') -Force
    Copy-Item (Join-Path $workspace 'scratch\es_home_sections.html') (Join-Path $homeTemplates 'es-home.html') -Force
}

# Copy all page templates into theme explore
$themeExplore = Join-Path $themeRoot 'explore'
New-Item -ItemType Directory -Path (Join-Path $themeExplore 'pages') -Force | Out-Null
foreach ($dir in (Get-ChildItem -LiteralPath (Join-Path $exploreRoot 'pages') -Directory)) {
    $targetDir = Join-Path (Join-Path $themeExplore 'pages') $dir.Name
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Get-ChildItem -LiteralPath $dir.FullName -Recurse -Filter '*.html' | ForEach-Object {
        $sub = $_.FullName.Substring($dir.FullName.Length).TrimStart('\')
        $dest = Join-Path $targetDir $sub
        New-Item -ItemType Directory -Path (Split-Path $dest -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $_.FullName -Destination $dest -Force
    }
}
Copy-Item (Join-Path $exploreRoot 'index.html') (Join-Path $themeExplore 'index.html') -Force

# 3. Prepare Sourcing reference files
$referenceRoot = Join-Path $themeRoot 'sourcing-reference'
New-Item -ItemType Directory -Path $referenceRoot -Force | Out-Null
foreach ($lang in @('vi', 'en', 'es')) {
    $source = Join-Path $buildRoot "$lang\sourcing\index.html"
    if (Test-Path -LiteralPath $source) {
        Copy-Item -LiteralPath $source -Destination (Join-Path $referenceRoot "$lang.html") -Force
    }
}

$logisticaRoot = Join-Path $buildRoot 'wp-content\themes\logistica'
if (Test-Path -LiteralPath $logisticaRoot) {
    $referenceAssets = @(
        'css\bootstrapb54d.css',
        'css\mainb54d.css',
        'css\speego-custom.css',
        'css\speego-process-tabs.css',
        'styleb54d.css',
        'js\speego-main.js',
        'js\jquery.magnific-popup\default-skin.svg',
        'images\favicon-speego.png',
        'images\logo-speego.png',
        'images\logo-speego-light.png',
        'images\hero-bg-speego.jpg',
        'images\map-world.png',
        'images\flags\vn.png',
        'images\flags\us.png',
        'images\bckg\loading-light.gif',
        'images\bckg\loading.gif'
    )
    foreach ($relative in $referenceAssets) {
        $source = Join-Path $logisticaRoot $relative
        if (Test-Path -LiteralPath $source) {
            $target = Join-Path (Join-Path $referenceRoot 'logistica') $relative
            New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
            Copy-Item -LiteralPath $source -Destination $target -Force
        }
    }
    $mainScript = Join-Path $referenceRoot 'logistica\js\speego-main.js'
    if (Test-Path -LiteralPath $mainScript) {
        $scriptSource = [System.IO.File]::ReadAllText($mainScript)
        foreach ($flag in @('vn', 'us')) {
            $oldPath = "/wp-content/themes/logistica/images/flags/$flag.png"
            $newPath = "' + window.speegoLogisticaAssetBase + 'images/flags/$flag.png"
            if ($scriptSource.Contains($oldPath)) {
                $scriptSource = $scriptSource.Replace($oldPath, $newPath)
            }
        }
        [System.IO.File]::WriteAllText($mainScript, $scriptSource)
    }
}

# 4. Packaging into ZIP archives
New-Item -ItemType Directory -Path $artifactRoot -Force | Out-Null
$outputs = @(
    (Join-Path $workspace 'speego-logistics-theme.zip'),
    (Join-Path $artifactRoot 'speego-logistics-theme.zip')
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

foreach ($output in $outputs) {
    if (Test-Path -LiteralPath $output) {
        Remove-Item -LiteralPath $output -Force
    }

    $archive = [System.IO.Compression.ZipFile]::Open($output, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        # Theme root files
        foreach ($file in Get-ChildItem -LiteralPath $themeRoot -Recurse -File) {
            $relative = $file.FullName.Substring($themeRoot.Length).TrimStart('\').Replace('\', '/')
            # Avoid duplicate explore
            if ($relative.StartsWith('explore/')) { continue }
            $entry = 'speego-logistics/' + $relative
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }

        # Explore bundle
        foreach ($file in Get-ChildItem -LiteralPath $exploreRoot -Recurse -File) {
            $relative = $file.FullName.Substring($exploreRoot.Length).TrimStart('\').Replace('\', '/')
            # Skip heavy design screenshot PNGs
            if ($relative -match '^pages/.+\.png$') {
                continue
            }
            $entry = 'speego-logistics/explore/' + $relative
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    } finally {
        $archive.Dispose()
    }

    $sizeMiB = [Math]::Round((Get-Item -LiteralPath $output).Length / 1MB, 2)
    Write-Host "Created theme package: $output ($sizeMiB MiB)" -ForegroundColor Green
}
