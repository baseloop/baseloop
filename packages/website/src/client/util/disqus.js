export function setPage (page) {
  if (window.DISQUS == null) {
    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = page
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://baseloop.disqus.com/embed.js'

    document.getElementsByTagName('head')[0].appendChild(script)
  } else {
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.url = window.location.href
        this.page.identifier = page
      }
    })
  }
}
