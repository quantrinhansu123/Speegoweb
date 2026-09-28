Add-Type -AssemblyName System.IO.Compression.FileSystem
$z = [System.IO.Compression.ZipFile]::OpenRead('D:\Speegoweb\speego-logistics-theme.zip')
Write-Host "Total entries in ZIP:" $z.Entries.Count
$z.Entries.FullName | Where-Object { $_ -match 'front|functions|style|home|sourcing' } | Select-Object -First 30
$z.Dispose()
