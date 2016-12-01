# encoding: utf-8

def clocknow()
  t = Time.new
  t.strftime("%d.%m.%Y, %H:%M Uhr")
end