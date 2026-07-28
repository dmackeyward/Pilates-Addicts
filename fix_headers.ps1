$root = Get-Location
$files = Get-ChildItem -Path $root\docs -Recurse -Filter '*.html'
foreach ($file in $files) {
    $text = Get-Content -Raw -Path $file.FullName
    if ($text -match '<header class="site-header">') { continue }
    $pattern = [regex]::new('(?s)<article class="card hero-card">\s*<h2>(.*?)</h2>\s*<p>(.*?)</p>\s*')
    $match = $pattern.Match($text)
    if (-not $match.Success) { continue }
    $title = $match.Groups[1].Value.Trim()
    $desc = $match.Groups[2].Value.Trim()
    $header = "  <header class=""site-header"">`n    <div class=""brand"">`n      <h1>$title</h1>`n      <p>$desc</p>`n    </div>`n  </header>`n"
    $text = $pattern.Replace($text, '<article class="card hero-card">',1)
    $bodyPattern = [regex]::new('(?s)(<body>\s*)(<main class="app-shell">)')
    if ($bodyPattern.IsMatch($text)) {
        $text = $bodyPattern.Replace($text, "`$1$header`$2",1)
    }
    Set-Content -Path $file.FullName -Value $text
    Write-Output "Updated $($file.FullName)"
}
