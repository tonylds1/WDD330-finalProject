//JavaScript module with functions general enough for multiple pages

function htmlToTextPigeonTranform(res) {
  try {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error("Bad Response");
    }
  } catch (e) {
    // console.log(e);
  }
}

export async function flyInTemplate(templatePath) {
  const html = await fetch(templatePath).then(htmlToTextPigeonTranform);
  // console.log(html)
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function flyInRenderedTemplate(template, parentElement, data, callback) {
  // clone the template
  let node = template.content.cloneNode(true);
  // if there is a callback, call it on the node and the data
  if (callback) {
    node = callback(node, data);
  }
  // add it to the DOM
  parentElement.appendChild(node);
}

export async function flyInHeaderFooter() {
  //create variable for header and footer
  let headerTemplate;
  let footerTemplate;
  //load template into variables 
  headerTemplate = await flyInTemplate("./partials/home-header.html");
  // console.log(headerTemplate);
  footerTemplate = await flyInTemplate("./partials/footer.html");
  // console.log(footerTemplate);
  //attach element to a variable
  const header = document.querySelector("header");
  // console.log(header);
  const footer = document.querySelector("footer"); 
  // console.log(footer);  
  flyInRenderedTemplate(headerTemplate, header);
  flyInRenderedTemplate(footerTemplate, footer);  
  }