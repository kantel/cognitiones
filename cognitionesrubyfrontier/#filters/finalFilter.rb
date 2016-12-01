def finalFilter(adrPageTable)
  # adrPageTable[:renderedtext] = process(adrPageTable[:renderedtext])
  # example:
  # smartypants support
  if adrPageTable[:markdown] || adrPageTable[:smartypants]
    IO.popen(%{"#{ENV['TM_SUPPORT_PATH']}/bin/SmartyPants.pl"}, "r+") do |io|
      io.write adrPageTable[:renderedtext]
      io.close_write
      adrPageTable[:renderedtext] = io.read
    end
  end
  # this is also a good place for final cleanup
  # for example, I like to remove any self-links that may have been accidentally generated
  # Füge den links auf die eigene Seite die Klasse "active" hinzu:
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<li><a href=\"\">", "<li class=\"active\"><a href=\"\">")
  # Amazonlinks mit einer eigenen Klasse versehen (1):
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<a href=\"http://www.amazon", "<a class=\"amazon\" title=\"Link zu Amazon\" href=\"http://www.amazon")
  # Amazonlinks mit einer eigenen Klasse versehen (2):
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<a rel=\"nofollow\" href=\"http://www.amazon", "<a rel=\"nofollow\" class=\"amazon\" title=\"Link zu Amazon\" href=\"http://www.amazon")
  # Amazonlinks mit einer eigenen Klasse versehen (3 - https statt http):
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<a href=\"https://www.amazon", "<a class=\"amazon\" title=\"Link zu Amazon\" href=\"https://www.amazon")
  # Wikipedialinks mit einer eigenen Klasse versehen:
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<a href=\"https://de.wikipedia", "<a class=\"wp\" title=\"Link zur deutschen Wikipedia\" href=\"https://de.wikipedia")
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<a href=\"https://en.wikipedia", "<a class=\"wp\" title=\"Link zur Wikipedia\" href=\"https://en.wikipedia")
  # Es gibt ein Problem mit kramdown, CDATA und HTML5. Erst einmal brute force gelöst:
  if adrPageTable[:kramdown]
    adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("><![CDATA", ">%<![CDATA")
    adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("]]>", "%]]>")
  end
  # Unnötige leere Paragraphen entfernen:
  adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<p></p>\n\n", "")
  if adrPageTable[:xml]
    adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("<p><item>", "<item>")
    adrPageTable[:renderedtext] = adrPageTable[:renderedtext].gsub("</item></p>", "</item>")
  end
end
