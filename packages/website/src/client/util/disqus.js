export function setPage (page) {
  if (window.DISQUS == null) {
    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = page
    }
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
