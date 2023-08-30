const getdata=async(isShowall)=>{
    const res=await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const dataobj=await res.json()
    const data=dataobj.data
    pushdata(data.tools,isShowall)
}
const pushdata=(data,isShowall)=>{ 
    const cardContainer=document.getElementById('card-container')
cardContainer.textContent=''
    if(!isShowall){
      data=data.slice(0,8)
      data?.forEach(data=>{
        const div=document.createElement('div')
        div.classList=`card card-compact bg-gray-300 text-black`
        div.innerHTML=`
        <figure><img class="hover:scale-110 hover:overflow-hidden hover:duration-300 " src="${data?.image? data.image:'image not found'}" alt="image not found" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <div id='list-feture'' class="border-b pb-4">${data.features}</div>
          <div class="card-actions justify-between items-center">
            <div >
                <h1>${data.name}</h1>
                <h1>${data.published_in}</h1>
            </div>
            <img onclick="handleModal('${data.id}')"  class="p-1 rounded-full cursor-pointer hover:scale-125 " src="Frame.png" alt="image not found" />
          </div>
        </div>  
         `
         cardContainer.appendChild(div)
    })
    }else{ 
      data?.forEach(data=>{
        const div=document.createElement('div')
        div.classList=`card card-compact bg-gray-300 text-black`
        div.innerHTML=`
        <figure><img class="hover:scale-110 hover:overflow-hidden hover:duration-300 " src="${data?.image? data.image:'image not found'}" alt="image not found" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <div id='list-feture'' class="border-b pb-4">${data.features}</div>
          <div class="card-actions justify-between items-center">
            <div >
                <h1>${data.name}</h1>
                <h1>${data.published_in}</h1>
            </div>
            <img onclick="handleModal('${data.id}')" class="p-1 rounded-full cursor-pointer hover:scale-125 " src="Frame.png" alt="image not found" />
          </div>
        </div>  
         `
         cardContainer.appendChild(div)
    })
    const hiddenbtn=document.getElementById('btn-show')
       hiddenbtn.classList.add('hidden')
    }
}
const showmore=(isShowall)=>{
  getdata(true)
  
}
const handleModal=(id)=>{
  my_modal_3.showModal()
  getdetails(id)   
}
const getdetails=async(id)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  const dataArry=await res.json()
  const data=dataArry.data
  const modalContainer=document.getElementById('show-details')
  modalContainer.innerHTML=`
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between ">
    <div>
      <h1>${data.description}</h1>
    <div class="flex justify-evenly  bg-gray-400">
      <div class=" p-1  border border-black">
        <h1>${data.pricing[0].price}</h1>
        <h1>${data.pricing[0].plan}</h1>
      </div>
      <div class="p-1  border border-black">
      <h1>${data.pricing[1].price}</h1>
      <h1>${data.pricing[1].plan}</h1>
      </div>
      <div class="p-1  border border-black ">
      <h1>${data.pricing[2].price}</h1>
      <h1>${data.pricing[2].plan}</h1>
      </div>
    </div>
      <div class="flex justify-between ">
        <div>
          <h1>features</h1>
          <ul></ul>
        </div>
        <div>
          <h1>Integrations</h1>
          <ul></ul>
        </div>
      </div>
    </div>
    <div>
      <img src="${data.image_link}" alt="">
      <h1>${data.accuracy.description}</h1>
      <p>${data.website}</p>
    </div>
   </div>
  `
  }
getdata()