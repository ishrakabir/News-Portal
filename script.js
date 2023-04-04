const loadCatagori = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url);
  const data = await res.json();
  displaycatagori(data.data.news_category);
}
loadCatagori();
const displaycatagori = datas => {

  const catagory = document.getElementById('catagory');
  catagory.innerHTML = ``;
  for (let it = 0; it < datas.length; it++) {
    const div = document.createElement('div');
    const pt = datas[it].category_name
    div.innerHTML = `
    <div onclick="showComment(${datas[it].category_id},'${datas[it].category_name}')">
      <a class="hover:underline underline-offset-[10px]">${datas[it].category_name}</a>
    </div>
      `;

    catagory.appendChild(div);
  };
}

const showComment = (inputId1, inputId2) => {
  const cataName = document.getElementById('cata_name');
  cataName.innerText = inputId2;
  loadCatagoriId(inputId1);
}
const loadCatagoriId = async (category_id) => {
  
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  newsPortal(data.data);
}
const newsPortal = data => {
  const count = document.getElementById('count');
  count.innerText = data.length + ` items found for catagory`;
  const newsPortal = document.getElementById('newsPortal');
  newsPortal.innerHTML = ``;
  data.forEach(it => {
    const div = document.createElement('div');
    const { title, image_url, details, _id, total_view } = it;
    div.innerHTML = `
     <div class="lg:flex py-4 my-10 bg-white border rounded-lg  container mx-auto justify-between">
            <img class="mb-6 mx-auto md:px-3 sm:my-auto lg:mx-6 w-[11rem] sm:w-[18rem] rounded-lg  md:h-[300px] md:w-[440px] sm:items-center" src="${image_url}" alt="" >
        
            <div class="w-full sm:px-5  mb-10 sm:mt-5 ">
                <h1 class="font-semibold md:text-xl text-xs sm:text-sm">${title}</h1>
                <p class="text-[#949494] text-xs my-3">${details.slice(0, 200)}...</p>
                <div class="flex flex-col sm:flex-row items-center justify-between mt-20 mb-10 md:mb-0 gap-y-5 md:gap-y-0">
                    <div class="flex items-center">
                        <div><img class="w-5 rounded-lg" src="${it.author.img}" alt=""></div>
                        <div class="md:px-4 px-1">
                            <p class="text-[#2B2C34] text-xs">Name : <span class="font-semibold">${it.author.name ? it.author.name:" "}</span></p>
                            <p class="text-[#718797] text-xs">Date : ${it.author.published_date}</p>
                        </div>
        
                    </div>
                    <div class="flex items-center lg:text-xl text-xs sm:text-sm">
                        <i class="fa-solid fa-eye md:px-2"></i>
                        <p class="text-[#515151]">${total_view ? total_view:'0'}</p>
                    </div>
                    <div class="lg:text-sm text-xs sm:text-sm">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                  <button onclick="showDetails('${_id}')" type="button" class="hover:text-blue-500" data-bs-toggle="modal" data-bs-target="#showDetails"> <i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                        
                    </div>
                </div>
            </div>
        </div>
    `
    newsPortal.appendChild(div);
  });
}

const showDetails = newsId => {
  loadNews(newsId);
}

const loadNews = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();

  showExtra(data.data[0]);
}


const showExtra = data => {

  const { title, details, image_url } = data;
  
  // const modal = document.getElementById('newsModal');
  // modal.innerHTML = `
  // `
  const titleNews = document.getElementById('showDetailsLabel');
  titleNews.innerText = title;
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
  <img class="mb-6 mx-auto md:px-3 sm:my-auto lg:mx-6 w-[11rem] sm:w-[18rem] rounded-lg  md:h-[300px] md:w-[440px] sm:items-center" src="${image_url}" alt="" >
  <p class="text-[#949494] text-xs my-3">${details}</p>
   <div class="flex items-center">
                        <div><img class="w-5 rounded-lg" src="${data.author.img}" alt=""></div>
                        <div class="md:px-4 px-1">
                            <p class="text-[#2B2C34] text-xs">Name : <span class="font-semibold">${data.author.name}</span></p>
                            <p class="text-[#718797] text-xs">Date : ${data.author.published_date}</p>
                        </div>
        
                    </div>
  `

}

const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

