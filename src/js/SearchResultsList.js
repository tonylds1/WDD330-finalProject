//Used for product-listing pages
import { loadTemplate, renderListWithTemplate } from "./utils.js";

export default class SearchResults {
  constructor(searchTerm, dataSource, listElement) {
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getBookData(this.searchTerm);
    // console.log(list)

    //render the list
    this.renderList(list.items)
  }

  async renderList(list) {
    this.listElement.innerHTML = "";
    const cardTemplate = await loadTemplate(
      "./partials/searchResults.html"
    );
    renderListWithTemplate(
      cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  prepareTemplate(templateClone, book) {
      console.log(book)
    //   templateClone.querySelector("img").src = book.volumeInfo.imageLinks.smallThumbnail;
    // templateClone.querySelector("a").href += product.Id;
    // templateClone.querySelector("img").src = product.Images.PrimaryMedium;
    // templateClone.querySelector("img").alt += product.Name;
    // templateClone.querySelector(".card__brand").innerHTML = product.Brand.Name;
    // templateClone.querySelector(".card__name").innerHTML =
    //   product.NameWithoutBrand;
    return templateClone;
  }
}