const OFFSET = 60
var kek =
  new Vue({
    el: "#header",
    data: {
      showNavbar: false,
      lastScrollPosition: 0,
      scrollValue: 0,
      work: 'status'
    },
    methods: {
      onScroll () {
        if (window.pageYOffset < 0)
          return
        if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET)
          return
        this.showNavbar = window.pageYOffset < this.lastScrollPosition && window.pageYOffset > 400
        this.lastScrollPosition = window.pageYOffset
      },
      WorkOrNot() {
        day = new Date().getDay();
        hour = new Date().getHours();
        if (day>0 && day<5) {
          if (hour>=9 && hour <=18)
            this.work = true;
        }
        else if (day == 5){
          if (hour>=9 && hour <=17)
            this.work = true;
        }

        if (this.work == true)
          this.work = 'открыто'
        else
          this.work = 'закрыто'
      }
    },
    mounted() {
      setInterval(() => {
        this.WorkOrNot();
      }, 1000);
      this.lastScrollPosition = window.pageYOffset
      window.addEventListener('scroll', this.onScroll)
      const viewportMeta = document.createElement('meta')
      viewportMeta.name = 'viewport'
      viewportNeta.content = 'width=device-width, initia-scale=1'
      document.head.appendChild(viewportMeta)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    }
  });