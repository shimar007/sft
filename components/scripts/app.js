'use strict';

//import jquery
import $ from "jquery";

//import axios
const axios = require('axios').default;

document.addEventListener('DOMContentLoaded', function(event) {
    
    //function call latest news
    latest_news();

});

//fuction to create link element
function create_link_element(element) {
    
    //create a link element
    var a = document.createElement('a');

    //create inner html element
    var inner_html = '<div class="latest-news-item-wrapper">';
    inner_html += '<div class="latest-news-item-image" style="background-image: url(/'+element.Imageurl+')"></div>';
    inner_html += '<div class="latest-news-item-content-wrapper">';
    inner_html += '<div class="latest-news-title"><h3>'+element.Title+'</h3></div>';
    inner_html += '<div class="latest-news-description"><p>'+element.Intro+'</p></div>';
    
    //check if comments is greater than 0
    if(parseInt(element.Comments) > 0) {
        inner_html += '<div class="latest-news-published"><span class="published">'+element.Published+'</span><span class="comments">'+element.Comments+'</span></div>';
    }
    else {
        inner_html += '<div class="latest-news-published"><span class="published">'+element.Published+'</span></div>'; 
    }

    inner_html += '</div>';
    inner_html += '</div>';
    
    a.innerHTML = inner_html;
    a.href = "#";
    a.className = 'latest-news-item';

    return a;
}

//function to populate latest news data
function latest_news() {
    
    //axios call to get data
    axios.get("/api/collection/collections-landing-page.json").then((response) => {
        
        //get response status
        var response_status = response.status;

        //check if status is 200
        if(response_status == 200) {
            
            //get landing page data collection
            var collections_landing_page_data = response.data.collection_data;

            //get left and right grid items
            var left_grid_items = document.querySelector('.latest-news-left');
            var right_grid_items = document.querySelector('.latest-news-right');

            //create fragements
            var left_fragment = document.createDocumentFragment();
            var right_fragment = document.createDocumentFragment();
            
            //access on collection landing page data
            $.map(collections_landing_page_data, function(elem, index) {
                //check if index === 0
                if(index === 0) {
                    //create link element and add it to left fragment
                    left_fragment.appendChild(create_link_element(elem));

                    //append to left grid items
                    left_grid_items.appendChild(left_fragment);
                }
                else {
                    //create link element and add it to right fragment
                    right_fragment.appendChild(create_link_element(elem));

                    //append to left grid items
                    right_grid_items.appendChild(right_fragment);
                }
            });
        }
        else {
            //check if status is nothing other than 200
        }
        
    }).catch((error) => console.error(error));


}