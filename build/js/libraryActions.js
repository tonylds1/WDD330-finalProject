var n=(_,t,e)=>new Promise((s,o)=>{var r=a=>{try{i(e.next(a))}catch(d){o(d)}},l=a=>{try{i(e.throw(a))}catch(d){o(d)}},i=a=>a.done?s(a.value):Promise.resolve(a.value).then(r,l);i((e=e.apply(_,t)).next())});import{getLocalStorage as b,setLocalStorage as h,alertMessage as g,removeAllInserts as u,insertTitle as c,insertBookCount as m,runModal as f,getStars as p}from"./utils.js";import k from"./externalServices.js";let v=new k;export default class y{constructor(t){this.storageKey=t,this.bookShelf=[],this.book={},this.readingProgress=new Map,this.bookCover="./images/bookCoverPlaceholder.png",this.subtitle="None",this.author="No Author Listed",this.publisher="No Publisher Listed",this.publishDate="No Publish Date Listed",this.starRating="Not Given",this.pages="Not Listed",this.genre="Not Listed",this.reviews="None Given",this.summary="None Given",this.header="",this.bttnNameNow="",this.bttnNameBefore="",this.bttnNameWant="",this.bookCount=0}getShelvedBooks(){return n(this,null,function*(){const t=document.getElementById("my_book_lists"),e=document.getElementById("card-container");if(this.selectShelfName(this.storageKey),this.bookShelf=yield b(this.storageKey),this.changeNullShelfToList(this.storageKey),e.innerHTML="",this.bookShelf.length<1)t.innerHTML=this.renderBanner(),this.addShelfTitleAndEmptyShelfMessage(t);else{let s=this.header+" Shelf!";c(t,s),u("alert","opening"),m(this.bookCount),this.bookShelf.length>=1&&u("banner2","opening"),this.setReadingProgress(),this.displayBooksFromShelf(e)}})}selectShelfName(){this.storageKey=="reading-shelf"?(this.header="Reading",this.bttnNameNow="Remove",this.bttnNameBefore="Read",this.bttnNameWant="Want to Read"):this.storageKey=="read-shelf"?(this.header="Read",this.bttnNameNow="Reading",this.bttnNameBefore="Remove",this.bttnNameWant="Want to Read"):this.storageKey=="want-read-shelf"&&(this.header="Want To Read",this.bttnNameNow="Reading",this.bttnNameBefore="Read",this.bttnNameWant="Remove")}changeNullShelfToList(){this.bookShelf==null&&(this.bookShelf=[],h(this.storageKey,this.bookShelf))}addShelfTitleAndEmptyShelfMessage(t){u("alert","opening"),g("Nothing is here, try adding a book!","my_book_lists",!1);let s=this.header+" Shelf!";c(t,s)}displayBooksFromShelf(t){return n(this,null,function*(){let e=document.querySelector(".count");for(const s of this.bookShelf){this.book=yield v.findBookById(s.id,!1),this.book.progress=this.readingProgress.get(s);try{this.bookCover=this.book.volumeInfo.imageLinks.smallThumbnail}catch(o){this.bookCover="./images/bookCoverPlaceholder.gif"}if(this.book.volumeInfo.subtitle?this.subtitle=": "+this.book.volumeInfo.subtitle:this.subtitle="",this.book.volumeInfo.authors?this.author=this.book.volumeInfo.authors.join(", "):this.author="No Author Listed",this.book.volumeInfo.publisher?this.publisher=this.book.volumeInfo.publisher:this.publisher="No Publisher Listed",this.book.volumeInfo.publishedDate?this.publishDate=new Date(this.book.volumeInfo.publishedDate).toDateString("en-US"):this.publishDate="No Publish Date Listed",this.book.volumeInfo.printedPageCount?this.pages=this.book.volumeInfo.printedPageCount+" Pages":this.pages="Book Length Not Given",this.book.volumeInfo.categories?this.genre="Category: "+this.book.volumeInfo.categories:this.genre="Genre Not Listed",this.book.volumeInfo.ratingsCount){let o;this.book.volumeInfo.ratingsCount==1?o=" Review":o=" Reviews",this.reviews=this.book.volumeInfo.ratingsCount+o}else this.reviews="No Reviews";this.book.volumeInfo.previewLink?this.summary=this.book.volumeInfo.description:this.summary="There is no summary given for this book.",this.starRating=p(this.book.volumeInfo.averageRating),this.bookCount++,t.innerHTML+=this.renderBookDetails(),this.addBttnFunctionality(),f(),this.storageKey!="want-read-shelf"&&(document.querySelectorAll("div.progress").forEach(o=>{o.removeAttribute("hidden")}),this.addReadingProgressEvent())}e.innerHTML=this.bookCount,this.bookCount=0})}renderBanner(){return`
    <div class="banner2">
      <p class="empty_shelf_text">
        Search for books and create your personal library of books you desire
        to read, books you are reading and completed.
      </p>
    </div>
    <section id="card-container">
    <!-- List for each book shelf of "Read"/"Reading"/"Want to Read" -->
    </section>
      `}renderBookDetails(){return`
    
      <div class="result-div card_size">
        <div class="book_count">
          <span class="specialCount">${this.bookCount}</span>       
          <img
            src="${this.bookCover}"
            alt="Cover for ${this.book.volumeInfo.title}"           
          />
          <div>
            <p class="shelf_label"><b><u>Current Shelf</u>:</b></p>
            <p class="current_shelf"><b>  ${this.header}</b></p>
          </div>
        </div>
        <div class="book-details">
          <h3 class="bookTitle">${this.book.volumeInfo.title}</h3>
          <hr>
          <p class="authors">By: ${this.author}</p>
          <br>
          <p class="publishDate">Published on ${this.publishDate}</p>
          <p class="publisher">by ${this.publisher}</p>
          <br><br>
          <div class="addToShelfButtons">
            <button type="button" class="addToReading" data-id="${this.book.id}">${this.bttnNameNow}</button>          
            <button type="button" class="addToWantToRead" data-id="${this.book.id}">${this.bttnNameWant}</button>
            <button type="button" class="addToRead" data-id="${this.book.id}">${this.bttnNameBefore}</button>
          </div>
          <form>
            <div class="progress" hidden>
              Read:
              <input type="range" class="progressInput" 
                  name="progressInput" min="0" max="100" 
                  oninput="progress.value=progressInput.value"
                  data-id="c${this.book.id}">

              <output name="progress" id="progress" for="progressInput">0</output>
              %
            </div>
          </form>
          <br>
          <div class="details_bttn_box"> 
            <!-- Trigger/Open The Modal -->       
            <button type="button" class="details_bttn" >Details</button>  
          </div>                     
        </div>          
        <!--_______________________________________ *** The Modal *** _________________________ -->
        <!--                                   |||                     |||                      -->
        <!--__________________________________ YYY Modal content Below YYY _____________________-->      
        <div id="myModal" class="modal">
          <div class="modal-content">        
            <span class="close">&times;</span>
            <section class="books-details">             
              <div class="modal_top_display">
                <div class="book_count">
                  <span class="specialCount">${this.bookCount}</span> 
                  <img  
                  src="${this.bookCover}"
                  alt="Cover for ${this.book.volumeInfo.title}"
                  class="book_modal_img"
                  class="pop-up"
                  />               
                </div>               
                <div class="books_modal_details">  
                  <h1 class="books_modal_title">${this.book.volumeInfo.title}${this.subtitle}</h1>       
                  <hr>
                  <h2 class="divider books_modal_authors">By: ${this.author}</h2>
                  <br>
                  <p class="books_modal_publish_date">Published on ${this.publishDate}</p>
                  <p class="books_modal_publisher">by ${this.publisher}</p>
                  <br>
                  <h3 class ="books_modal_page_count">${this.pages}</h3>
                  <br><br><br>
                  <h3 class="books_modal_genre">${this.genre}</h3>              
                  <br>
                  <h2 class="books_modal_ratings">${this.reviews} &nbsp; ${this.starRating}</h2>
                  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                  <br><br><br>
                  <h3><u>Book Links</u></h3>                         
                  <h3><a href=${this.book.volumeInfo.infoLink} target="_blank" class="books_modal_infoLink">Book Info From Google Play</a></h3>              
                  <h3><a href=${this.book.volumeInfo.previewLink} target="_blank" class="books_modal_previewLink">Book Preview from Google Books</a></h3>     
                </div> 
              </div>
              <br>             
              <h2 class="books_modal_summary_title">Book Summary:</h2>
              ${this.summary}       
            </section>
          </div>
        </div>        
        <!-- ***************************** End of modal pop up HTML **************************** -->      
      </div>
    `}addReadingProgressEvent(){document.querySelectorAll(".progressInput").forEach(e=>{const s=e.getAttribute("data-id");e.value=this.readingProgress.get(s)||0,e.nextElementSibling.innerHTML=e.value,e.addEventListener("change",()=>n(this,null,function*(){this.handleReadingProgress(s,e.value)}))})}addBttnFunctionality(){document.querySelectorAll(".addToReading"),[{class:".addToReading",name:"reading-shelf"},{class:".addToRead",name:"read-shelf"},{class:".addToWantToRead",name:"want-read-shelf"}].forEach(e=>{document.querySelectorAll(e.class).forEach(o=>{o.textContent=="Remove"?o.className+=" book_delete":o.className+=" book_add",o.addEventListener("click",()=>n(this,null,function*(){let r=o.getAttribute("data-id");this.alterShelf(r,e.name),this.storageKey!="read-shelf"&&e.name!=this.storageKey&&this.alterShelf(r,this.storageKey)}))})})}alterShelf(t,e){let s=b(e);s==null&&(s=[]);let o=new Date,r={id:t,now:o},l=!1;if(s.forEach(i=>{t==i.id?(i.now=o,l=!0,i.duplicate=!0):i.duplicate=!1}),this.storageKey==e){let i=[];s.forEach(a=>{a.duplicate==!1&&i.push(a)}),h(e,i),this.getShelvedBooks()}else l==!1&&(r.duplicate=!1,s.push(r)),h(e,s)}setReadingProgress(){const t=b("reading-progress");this.readingProgress=new Map(t)}handleReadingProgress(t,e){this.readingProgress.set(t,e),h("reading-progress",Array.from(this.readingProgress.entries()))}}
