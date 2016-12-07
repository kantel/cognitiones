# Hallo MkDocs

Test! Test! Test!

## Und wie geht es weiter?

Erst einmal mit ein wenig Python-Code:

```python
println("Hello Jörg")
```

Und dann mit einer Fußnote[^1] mitten im Text. Dafür muß allerdings in der `mkdocs.yaml` die [Python Markdown Extension][1] mit

[^1]: Das ist eine Fußnote.

```yaml
markdown_extensions:
- footnotes
```

explizit geladen werden.

## Todos

  * Die Schrift muß größer werden, die Default-Schriftgröße ist nichts für meine alten Augen. √
  * Ich hätte gerne grüne `<h1>`-Überschriften. √
  * Das Karo-Muster im Hintergrund sollte weg. √


[1]: https://pythonhosted.org/Markdown/extensions/