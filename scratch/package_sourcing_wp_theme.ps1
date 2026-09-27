$ErrorActionPreference = 'Stop'

$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$themeRoot = Join-Path $workspace 'wordpress-theme\speego-logistics'
$exploreRoot = Join-Path $workspace 'explore'
$artifactRoot = Join-Path $workspace 'artifacts'
$buildRoot = Join-Path $workspace 'public'

Push-Location $workspace
try {
    & node prepare-vercel.js
    if ($LASTEXITCODE -ne 0) { throw 'Vercel reference build failed.' }
} finally {
    Pop-Location
}

$referenceRoot = Join-Path $themeRoot 'sourcing-reference'
New-Item -ItemType Directory -Path $referenceRoot -Force | Out-Null
foreach ($lang in @('vi', 'en', 'es')) {
    $source = Join-Path $buildRoot "$lang\sourcing\index.html"
    Copy-Item -LiteralPath $source -Destination (Join-Path $referenceRoot "$lang.html") -Force
}

$logisticaRoot = Join-Path $buildRoot 'wp-content\themes\logistica'
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
    if (-not (Test-Path -LiteralPath $source)) { throw "Missing reference asset: $relative" }
    $target = Join-Path (Join-Path $referenceRoot 'logistica') $relative
    New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force
}
$mainScript = Join-Path $referenceRoot 'logistica\js\speego-main.js'
$scriptSource = [System.IO.File]::ReadAllText($mainScript)
foreach ($flag in @('vn', 'us')) {
    $oldPath = "/wp-content/themes/logistica/images/flags/$flag.png"
    $newPath = "' + window.speegoLogisticaAssetBase + 'images/flags/$flag.png"
    if (-not $scriptSource.Contains($oldPath)) { throw "Missing flag path in reference script: $flag" }
    $scriptSource = $scriptSource.Replace($oldPath, $newPath)
}
[System.IO.File]::WriteAllText($mainScript, $scriptSource)

New-Item -ItemType Directory -Path $artifactRoot -Force | Out-Null
$output = Join-Path $artifactRoot 'speego-logistics-sourcing-preview.zip'
if (Test-Path -LiteralPath $output) {
    Remove-Item -LiteralPath $output -Force
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($output, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($file in Get-ChildItem -LiteralPath $themeRoot -Recurse -File) {
        $relative = $file.FullName.Substring($themeRoot.Length).TrimStart('\').Replace('\', '/')
        $entry = 'speego-logistics/' + $relative
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
    foreach ($file in Get-ChildItem -LiteralPath $exploreRoot -Recurse -File) {
        $relative = $file.FullName.Substring($exploreRoot.Length).TrimStart('\').Replace('\', '/')
        # Page PNG files are QA screenshots; live pages only reference them in CSS comments.
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
Write-Output "$output ($sizeMiB MiB)"
