var n=(_,o,t)=>new Promise((s,e)=>{var a=l=>{try{i(t.next(l))}catch(r){e(r)}},h=l=>{try{i(t.throw(l))}catch(r){e(r)}},i=l=>l.done?s(l.value):Promise.resolve(l.value).then(a,h);i((t=t.apply(_,o)).next())});import{getLocalStorage as u,setLocalStorage as d,alertMessage as m,removeAllInserts as b,insertTitle as c,insertBookCount as f,runModal as k,getStars as v}from"./utils.js";import p from"./externalServices.js";let g=new p;export default class y{constructor(o){this.storageKey=o,this.bookShelf=[],this.book={},this.bookCover="./images/bookCoverPlaceholder.png",this.subtitle="None",this.author="No Author Listed",this.publisher="No Publisher Listed",this.publishDate="No Publish Date Listed",this.starRating="Not Given",this.pages="Not Listed",this.genre="Not Listed",this.reviews="None Given",this.summary="None Given",this.header="",this.bttnNameNow="",this.bttnNameBefore="",this.bttnNameWant="",this.bookCount=0}getShelvedBooks(){return n(this,null,function*(){const o=document.getElementById("my_book_lists"),t=document.getElementById("card-container");if(this.selectShelfName(this.storageKey),this.bookShelf=yield u(this.storageKey),this.changeNullShelfToList(this.storageKey),this.bookShelf.length<1)t.innerHTML="",o.innerHTML=this.renderBanner(),this.addShelfTitleAndEmptyShelfMessage(o);else{t.innerHTML="";let s=this.header+" Shelf!";c(o,s),b("alert","opening"),f(this.bookCount),this.bookShelf.length>=1&&b("banner2","opening"),this.displayBooksFromShelf(t)}})}selectShelfName(){this.storageKey=="reading-shelf"?(this.header="Reading",this.bttnNameNow="Remove",this.bttnNameBefore="Read",this.bttnNameWant="Want to Read"):this.storageKey=="read-shelf"?(this.header="Read",this.bttnNameNow="Reading",this.bttnNameBefore="Remove",this.bttnNameWant="Want to Read"):this.storageKey=="want-read-shelf"&&(this.header="Want To Read",this.bttnNameNow="Reading",this.bttnNameBefore="Read",this.bttnNameWant="Remove")}changeNullShelfToList(){this.bookShelf==null&&(this.bookShelf=[],d(this.storageKey,this.bookShelf))}addShelfTitleAndEmptyShelfMessage(o){b("alert","opening"),m("Nothing is here, try adding a book!","my_book_lists",!1);let s=this.header+" Shelf!";c(o,s)}displayBooksFromShelf(o){return n(this,null,function*(){let t=document.querySelector(".count");for(const s of this.bookShelf){this.book=yield g.findBookById(s.id,!1);try{this.bookCover=this.book.volumeInfo.imageLinks.smallThumbnail}catch(e){this.bookCover="./images/bookCoverPlaceholder.gif"}if(this.book.volumeInfo.subtitle?this.subtitle=": "+this.book.volumeInfo.subtitle:this.subtitle="",this.book.volumeInfo.authors?this.author=this.book.volumeInfo.authors.join(", "):this.author="No Author Listed",this.book.volumeInfo.publisher?this.publisher=this.book.volumeInfo.publisher:this.publisher="No Publisher Listed",this.book.volumeInfo.publishedDate?this.publishDate=new Date(this.book.volumeInfo.publishedDate).toDateString("en-US"):this.publishDate="No Publish Date Listed",this.book.volumeInfo.printedPageCount?this.pages=this.book.volumeInfo.printedPageCount+" Pages":this.pages="Book Length Not Given",this.book.volumeInfo.categories?this.genre="Category: "+this.book.volumeInfo.categories:this.genre="Genre Not Listed",this.book.volumeInfo.ratingsCount){let e;this.book.volumeInfo.ratingsCount==1?e=" Review":e=" Reviews",this.reviews=this.book.volumeInfo.ratingsCount+e}else this.reviews="No Reviews";this.book.volumeInfo.previewLink?this.summary=this.book.volumeInfo.description:this.summary="There is no summary given for this book.",this.starRating=v(this.book.volumeInfo.averageRating),this.bookCount++,o.innerHTML+=this.renderBookDetails(),this.addBttnFunctionality(),k()}t.innerHTML=this.bookCount,this.bookCount=0})}renderBanner(){return`
    <div class="banner2">
      <p>
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
          <br><br>
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
    `}addBttnFunctionality(){document.querySelectorAll(".addToReading").forEach(e=>{e.textContent=="Remove"?e.className+=" book_delete":e.className+=" book_add",e.addEventListener("click",()=>n(this,null,function*(){let a=e.getAttribute("data-id");this.alterShelf(a,"reading-shelf")}))}),document.querySelectorAll(".addToRead").forEach(e=>{e.textContent=="Remove"?e.className+=" book_delete":e.className+=" book_add",e.addEventListener("click",()=>n(this,null,function*(){let a=e.getAttribute("data-id");this.alterShelf(a,"read-shelf")}))}),document.querySelectorAll(".addToWantToRead").forEach(e=>{e.textContent=="Remove"?e.className+=" book_delete":e.className+=" book_add",e.addEventListener("click",()=>n(this,null,function*(){let a=e.getAttribute("data-id");this.alterShelf(a,"want-read-shelf")}))})}alterShelf(o,t){let s=u(t);s==null&&(s=[]);let e=new Date,a={id:o,now:e},h=!1;if(s.forEach(i=>{o==i.id?(i.now=e,h=!0,i.duplicate=!0):i.duplicate=!1}),this.storageKey==t){let i=[];s.forEach(l=>{l.duplicate==!1&&i.push(l)}),d(t,i),this.getShelvedBooks()}else h==!1&&(a.duplicate=!1,s.push(a)),d(t,s)}}
