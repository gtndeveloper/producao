class MobileNavbar {
    constructor(mobileMenu, navList) {
        this.mobileMenu = $(mobileMenu);
        this.MobileList = $(navList);
        this.activeClass = "active";
    }

    addClickEvent() {
        $(this.mobileMenu).click(() => {
            $("body").toggleClass("menuExpanded")
            $(this.MobileList).toggle(this.activeClass)
        })
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this
    }
}

const mobileNavbar = new MobileNavbar(
    ".menuOpen,.menuClose",
    ".navList"
)

mobileNavbar.init()