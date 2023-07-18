
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }



/**
 * Portofolio Load More
 */
const projectsEl = document.querySelector('.portfolio-container');
const loaderEl = document.querySelector('.loader');
let currentPage = 0;
const limit = 6;
let total = 0;
let totalPageCount = 0;
    let contactClientHeight = document.getElementById('contact').scrollHeight;
    let footerClientHeight = document.getElementById('footer').scrollHeight;


let ProjectsListJson = [{"cat":"Estate", "id":1,"name":"Mimary","url":"mimary.com","thumb":"assets/img/portfolio/work/mimary1.png","img":"assets/img/portfolio/projects/mimary.png","details":"","link":"https://"},
    {"cat":"E-commerce", "id":2,"name":"mcgiglass","url":"mcgiglass.com","thumb":"assets/img/portfolio/work/mcgi1.png","img":"assets/img/portfolio/projects/mcgi.png","details":"","link":"https://mcgiglass..com"},
    {"cat":"Clinics", "id":3,"name":"Dawali Clinics","url":"dawaliclinics.com","thumb":"assets/img/portfolio/work/dawali1.png","img":"assets/img/portfolio/projects/Dawali.png","details":"","link":"https://dawaliclinics.com"},
    {"cat":"Restaurant", "id":4,"name":"Al dallah al shameyah","url":"aldallahalshameyah.com","thumb":"assets/img/portfolio/work/al-Dallah1.png","img":"assets/img/portfolio/projects/Al-Dallah.png","details":"","link":"https://"},
    {"cat":"E-commerce", "id":5,"name":"Maizam Paris","url":"maizamparis.com","thumb":"assets/img/portfolio/work/maizam1.png","img":"assets/img/portfolio/projects/maizam.png","details":"maizam-details.html"},
    {"cat":"Clinics", "id":6,"name":"mag clinic","url":"magclinic.ae","thumb":"assets/img/portfolio/work/mag1.png","img":"assets/img/portfolio/projects/MAG.png","details":"","link":"https://magclinic.ae"},
    {"cat":"E-commerce", "id":7,"name":"Markatcom","url":"markatcom.com","thumb":"assets/img/portfolio/work/markatkom1.png","img":"assets/img/portfolio/projects/markatkom.png","details":"","link":"https://markatcom.com"},
    {"cat":"Restaurant", "id":8,"name":"Nutela Rose","url":"nutelarose.com","thumb":"assets/img/portfolio/work/nutela1.png","img":"assets/img/portfolio/projects/nutela.png","details":"","link":"https://"},
    {"cat":"E-commerce", "id":9,"name":"Nolamisu","url":"nolamisu.com","thumb":"assets/img/portfolio/work/nolamisu1.png","img":"assets/img/portfolio/projects/nolamisu.png","details":"","link":"https://nolamisu.com "},
    {"cat":"Artistic", "id":10,"name":"Emar alsham","url":"emaralsham.net","thumb":"assets/img/portfolio/work/emar1.png","img":"assets/img/portfolio/projects/emar.png","details":"","link":"https://"},
    {"cat":"E-commerce", "id":11,"name":"Mondial","url":"mondial-sy.com","thumb":"assets/img/portfolio/work/mondial1.png","img":"assets/img/portfolio/projects/mondial.png","details":"","link":"https://mondial-sy.com"},
    {"cat":"Energy", "id":12,"name":"greentech Solar","url":"greentechsolar.at","thumb":"assets/img/portfolio/work/greentechsolar1.png","img":"assets/img/portfolio/projects/greentechsolar.png","details":"","link":"https://"},
    {"cat":"animal", "id":13,"name":"Alalawi Vet","url":"alalawivet.com","thumb":"assets/img/portfolio/work/alawi1.png","img":"assets/img/portfolio/projects/Alawi.png","details":"","link":"https://"},
    {"cat":"E-commerce", "id":14,"name":"Mikazzo","url":"mikazzo.com","thumb":"assets/img/portfolio/work/mikkazo1.jpg","img":"assets/img/portfolio/projects/mikkazo.jpg","details":"","link":"https://mikazzo.com"},
    {"cat":"Medical", "id":15,"name":"Excel pharma","url":"excelph.com","thumb":"assets/img/portfolio/work/excel1.png","img":"assets/img/portfolio/projects/Excel.png","details":"","link":"https://excelph.com"},
    {"cat":"Restaurant", "id":16,"name":"BV Golden Sands Hotel","url":"","thumb":"assets/img/portfolio/work/bv1.png","img":"assets/img/portfolio/projects/BV.png","details":"bv-details.html"},
    {"cat":"Oil", "id":17,"name":"OIL EXPLORATION COMPANY","url":"www.oec.oil.gov.iq","thumb":"assets/img/portfolio/work/oec1.png","img":"assets/img/portfolio/projects/oec.png","details":"","link":"https://"},
    {"cat":"Party", "id":18,"name":"iraqiparty","url":"iraqipartyorg","thumb":"assets/img/portfolio/work/party1.png","img":"assets/img/portfolio/projects/party.png","details":"","link":"https://"},
    {"cat":"Medical", "id":19,"name":"Delta Pharma","url":"deltapharma.net","thumb":"assets/img/portfolio/work/delta1.png","img":"assets/img/portfolio/projects/delta.png","details":"","link":"https://deltapharma.net"},
    {"cat":"Medical", "id":20,"name":"al-maysoon","url":"al-maysoon.com","thumb":"assets/img/portfolio/work/maysoon1.png","img":"assets/img/portfolio/projects/maysoon.png","details":"","link":"https://al-maysoon.com"},
    {"cat":"Constructions", "id":21,"name":"alkhatabco","url":"alkhatabco.com","thumb":"assets/img/portfolio/work/alKhatab1.png","img":"assets/img/portfolio/projects/AlKhatab.png","details":"","link":"https://"},
    {"cat":"Constructions", "id":22,"name":"Taha Partners","url":"taha-partners.com","thumb":"assets/img/portfolio/work/taha1.png","img":"assets/img/portfolio/projects/Taha.png","details":"","link":"https://"},
    {"cat":"Constructions", "id":23,"name":"Jawharat Baghdad","url":"jb-iq.com","thumb":"assets/img/portfolio/work/jb1.png","img":"assets/img/portfolio/projects/jb.png","details":"","link":"https://"},
    {"cat":"Constructions", "id":24,"name":"alshura","url":"alshura.com","thumb":"assets/img/portfolio/work/alshura1.png","img":"assets/img/portfolio/projects/alshura.png","details":"","link":"https://"},
    {"cat":"transportation", "id":25,"name":"Sama Al-arabiyah","url":"sa-iq.co","thumb":"assets/img/portfolio/work/sama1.png","img":"assets/img/portfolio/projects/Sama.png","details":"","link":"https://"},
    {"cat":"Personal", "id":26,"name":"Dr. Hani Hashem","url":"hanihashemmd.com","thumb":"assets/img/portfolio/work/hani1.png","img":"assets/img/portfolio/projects/hani.png","details":"","link":"https://"},
    {"cat":"Personal", "id":27,"name":"Architect Sherif Aoun","url":"sherifaoun.com","thumb":"assets/img/portfolio/work/sherif1.png","img":"assets/img/portfolio/projects/sherif.png","details":"","link":"https://"},
    {"cat":"Bank", "id":28,"name":"Trans Iraq Bank","url":"www.tib.iq","thumb":"assets/img/portfolio/work/tib1.png","img":"assets/img/portfolio/projects/tib.png","details":"tib-details.html"},
    {"cat":"Applications", "id":29,"name":"SWS RMS","url":"","thumb":"assets/img/portfolio/work/sws1.png","img":"assets/img/portfolio/projects/SWS.png","details":"sws-details.html"},
    {"cat":"Applications", "id":30,"name":"Syrachem","url":"","thumb":"assets/img/portfolio/work/syrachem1.png","img":"assets/img/portfolio/projects/Syrachem.png","details":"Syrachem-details.html"},
    {"cat":"Applications", "id":31,"name":"Harir","url":"","thumb":"assets/img/portfolio/work/harir1.png","img":"assets/img/portfolio/projects/harir.png","details":"harir-details.html"},
    {"cat":"Applications", "id":32,"name":"Web Solutions Warehouse","url":"wsw-co.com","thumb":"assets/img/portfolio/work/wsw1.png","img":"assets/img/portfolio/projects/wsw.png","details":"","link":"https://"},
    {"cat":"Applications", "id":33,"name":"Clinicana","url":"","thumb":"assets/img/portfolio/work/clinicanaapp1.png","img":"assets/img/portfolio/projects/clinicanaapp.png","details":"clinicanaapp-details.html"},
];
total = ProjectsListJson.length;
totalPageCount = Math.ceil(total / limit);

// get the Projects from API
const getProjects = async (page, limit) => {
    let ProjectsList = ProjectsListJson.slice(currentPage*limit, (currentPage*limit)+limit);
    // let ProjectsList = ProjectsListJson;
    currentPage++;
    return await ProjectsList;
}
const getFilteredProjects = (cat) => {
    let filteredProjectsList = ProjectsListJson.filter(function (el) {
        return '.filter-'+el.cat == cat;
    });
    return filteredProjectsList;
}


// show the projects
const showProjects = (projects) => {

    projects.forEach(project => {
        createPortfolioItem(project);
});
    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Initiate portfolio details lightbox
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });
};
let loadingProjects = false;


const hideLoader = () => {
    loaderEl.classList.remove('show');
};

const showLoader = () => {
    loaderEl.classList.add('show');
};

const hasMoreProjects = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    //return total === 0 || startIndex < total;
    return currentPage < totalPageCount;
};

// load projects
const loadProjects = async (page, limit) => {

    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
        try {
            // if having more quotes to fetch
            if (hasMoreProjects(page, limit, total)) {
        // call the API to get quotes
        loadingProjects = true;
        const response = await getProjects(page, limit);
        //const data = JSON.parse(JSON.stringify(response));
        // show quotes
        showProjects(response);
    }
} catch (error) {
    console.log(error.message);
} finally {
    hideLoader();
    loadingProjects = false;
}
}, 2000);

};

loadProjects(currentPage, limit);
window.addEventListener('scroll', () => {
   const {
       scrollTop,
       scrollHeight,
       clientHeight
       } = document.documentElement;
if ( window.scrollY >= (scrollHeight - contactClientHeight - footerClientHeight - 600) && hasMoreProjects(currentPage, limit, total) && !loadingProjects) {
    loadingProjects = true;
    loadProjects(currentPage, limit);
}
}, {
   passive: true
});

function createPortfolioItem(project) {
    var fragment = document.createDocumentFragment();
    var field = document.createElement('div');
    field.className = `col-lg-4 col-md-6 portfolio-item filter-${project.cat}`;
    field.id = `work-${project.id}`;
    let detailsDiv = `<a href="${project.details}" class="portfolio-details-lightbox" data-glightbox="type: external" title="Portfolio Details"><i class="bx bx-link"></i></a>`;
    if(project.details==''){
        detailsDiv = `<a href="https://${project.url}" target="_blank" title="Project Url"><i class="bx bx-link"></i></a>`;
    }
    field.innerHTML = `
<div class="portfolio-wrap">
    <img src="${project.thumb}" class="img-fluid" alt="">
    <div class="portfolio-info">
    <h4>${project.name}</h4>
    <div class="portfolio-links">
    <a href="${project.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${project.name}"><i class="bx bx-zoom-in"></i></a>
    ${detailsDiv}
    </div>
    </div>
    </div>
        `;
    fragment.appendChild(field);
    //projectsEl.appendChild(fragment);
    projectsEl.append(fragment);
}
let filters = document.querySelectorAll('[data-filter]');

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        for (const element of filters) {
    element.addEventListener("click", e => {
    const portfolioContainerDiv = document.querySelector('#portfolio-container');
    portfolioContainerDiv.innerHTML='';
    if(e.target.dataset.filter == '*'){
        currentPage = 0;
        loadProjects(currentPage, limit);
    }else{
       loadingProjects = true;
        const response = getFilteredProjects(e.target.dataset.filter);
        //const data = JSON.parse(JSON.stringify(response));
        // show quotes
        showProjects(response);
    }
});
}


    });



    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

})()
