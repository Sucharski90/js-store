$(function() {
    $('input, textarea').placeholder();
  });

$(".validate").validate({
submitHandler: function(form) {
form.submit();
}
});
 
 $("#new_form_payment").validate({
submitHandler: function(form) {
form.submit();
}
});
 $("#newsletter").validate({
submitHandler: function(form) {
form.submit();
}
});



$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
  })
})


// REMOVE SCREEN COVER NAV ON LARGE SCREEN
$(window).resize(function() {
    if ($(window).width() > 991) {
      $( "#navbarNav" ).removeClass( "open" )
      $( "#hamburger-6" ).removeClass( "is-active" )
      
    }
}).resize();


$(document).ready(function(){
  $(".navbar-toggler").click(function(){
    $('#hamburger-6').toggleClass("is-active");
  });
});

let searchBox = document.getElementById("search-panel");
function slide() {
  searchBox.classList.toggle('show-search');
}

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  
 
  
  
  cart = [];
  // Constructor
  function Item(name, price, size, sku, available,  productIdentifier, image, thumbnail, count) {
    this.name = name;
    this.price = price;
    this.size = size;
    this.sku = sku;
    this.available = available;
    this.productIdentifier = productIdentifier;
    this.image = image;
    this.thumbnail = thumbnail;
    this.count = count;
  }
  
  
 // Change Item
//  $('.sizes').change(function(event) {
//     let selectedSize = event.target.value
//     console.log(selectedSize)
//     if(selectedSize == "small") {
//         var element = document.getElementById("orange-select"); 
//         element.setAttribute("data-price", "4"); 
//     }
// });

  // Save cart
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
    
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  // Add to cart
  obj.addItemToCart = function(name, price, size, sku, available, productIdentifier, image, thumbnail, count) {
        for(var item in cart) {
            // NEEDED TO ADD NEW SIZE TO CART DONT DELETE
            if(cart[item].name === name  && cart[item].size === size) {
              console.log(event.target.dataset.quantity)
              var additionalAmount = event.target.dataset.quantity
              cart[item].count = cart[item].count + parseInt(additionalAmount);
              saveCart();
              return;
            }
        }
        var item = new Item(name, price, size, sku, available, productIdentifier, image, thumbnail, count);
        
        
        cart.push(item);
        saveCart();
  }
  
 
obj.addItemToCartTwo = function(name, price, size, sku, available, productIdentifier, image, thumbnail, count) {
        for(var item in cart) {
            // NEEDED TO ADD NEW SIZE TO CART DONT DELETE
            if(cart[item].name === name  && cart[item].size === size) {
              cart[item].count ++
              saveCart();
              return;
            }
        }
        var item = new Item(name, price, size, sku, available, productIdentifier, image, thumbnail, count);
        
        
        cart.push(item);
        saveCart();
  }



  // Set count from item
  obj.setCountForItem = function(name, size, sku, available, productIdentifier, image, thumbnail, count) {
    for(var i in cart) {
      if (cart[i].name === name && cart[i].size === size) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
 obj.removeItemFromCart = function(name, price, size, sku, available, productIdentifier, image, thumbnail, count) {
      for(var item in cart) {
        if(cart[item].name === name && cart[item].size === size) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name, size, sku, available, productIdentifier, thumbnail, image) {
    for(var item in cart) {
      if(cart[item].name === name && cart[item].size === size) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 



  let url = '/product-feed.json';

fetch(url).then(function (res) {
	return res.json();
}).then(function (obj) {
  var fullProductList = [];
 // console.log(obj.products)
  fullProductList.push(obj.products)
  
 

// Add item
$('.add-to-cart').click(function(event) {
  console.log($(this).data('productid'));
  $( "#nav-cart" ).removeClass( "added-to-cart" );
  $( "#nav-cart" ).addClass( "added-to-cart" );
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var size = event.target.dataset.size;
  var sku = event.target.dataset.sku + "-" + size;
  var available = event.target.dataset.available;
  var productIdentifier = event.target.dataset.productid;
  var thumbnail = event.target.dataset.thumbnail;
  var image = event.target.dataset.image;
  var countString = event.target.dataset.quantity;
  var count = parseInt(countString);
  shoppingCart.addItemToCart(name, price, size, sku, available, productIdentifier, thumbnail, image, count);
  displayCart();
});



// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});









function displayCart() {
  
  
  var cartArray = shoppingCart.listCart();
  
  
  
  var outOfStockProductList = []
  
  for (var i = 0; i < fullProductList[0].length; i++) {
    if(fullProductList[0][i].available.sold_out == "TRUE"){
      outOfStockProductList.push(fullProductList[0][i].sku)
    }
    if(fullProductList[0][i].available[0].S == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-S")
    }
    if(fullProductList[0][i].available[0].M == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-M")
    }
    if(fullProductList[0][i].available[0].L == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-L")
    }
    if(fullProductList[0][i].available[0].XL == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-XL")
    }
    if(fullProductList[0][i].available[0].TwoX == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-2X")
    }
    if(fullProductList[0][i].available[0].ThreeX == "FALSE"){
      outOfStockProductList.push(fullProductList[0][i].sku + "-3X")
    }
   }
  
  var cartOutOfStockItems = []
  for (var i = 0; i < cartArray.length; i++) {
    var currentProductIndex = outOfStockProductList.findIndex(p => p == cartArray[i].sku);
  if(currentProductIndex > -1) {
    cartArray[i].available = "product-out-of-stock"
    cartOutOfStockItems.push(cartArray[i].name)
  }
 }
  if(cartOutOfStockItems.length > 0) {
  $( '.checkout-payment-form-wrapper' ).css( "opacity", "50%" );
    $( '.checkout-payment-form-wrapper' ).css( "pointer-events", "none" );
    $( '.checkout-warning' ).css( "display", "block" );
  } else {
  $( '.checkout-payment-form-wrapper' ).css( "opacity", "1" );
    $( '.checkout-payment-form-wrapper' ).css( "pointer-events", "all" );
    $( '.checkout-warning' ).css( "display", "none" );
  }
  console.log(cartOutOfStockItems)
  
  
  
  
  var output = "";
  for(var i in cartArray) {
    output += "<tr class='" + cartArray[i].available + "'>"
    + "<td><button class='delete-item btn btn-danger rounded-0 p-2' data-name='" + cartArray[i].name + "' data-size=" + cartArray[i].size + "><i class='fa-solid fa-trash-xmark'></i></button></td>"
    + "<td width='100'>" + "<img src='" + cartArray[i].thumbnail + "' alt='IMG' class='img-fluid'>" + "</td>"
    
    + "<td>" 
      + "<h4>" + cartArray[i].name + "</h4>" 
      + "<div class='small text-success'><span>In Stock</span></div>" 
      + "<div class='size'>" + "Size:<span>" + cartArray[i].size + "</span>" + "</div>" 
      + "<div class='quantity'> Quantity:" 
      + "<div class='input-group w-quantity'><button class='minus-item input-group-addon btn btn-primary rounded-0' data-name='" + cartArray[i].name + "' data-size='" + cartArray[i].size + "'>-</button>"
      + "<input type='number' class='item-count form-control text-center' data-name='" + cartArray[i].name + "' data-size='" + cartArray[i].size + "'  value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon rounded-0' data-name='" + cartArray[i].name + "' data-size='" + cartArray[i].size + "'>+</button></div>"
      + "<p class='text-xs sku'>SKU:<span>" + cartArray[i].sku + "</span></p>"
	 + "</td>"
     + "<td class='price-individual font-weight-bold text-center'>" + "$" + cartArray[i].price.toFixed(2) + "</td>"
     + " = " 
    + "<td class='price-subtotal font-weight-bold text-primry text-right'>" + "$" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  
  
  
  var counter = 1
  var output2 = "";
  for(var i in cartArray) {
    output2 += "ITEM " + [counter++] + ": Sku: [" + cartArray[i].sku + "], Size: [" + cartArray[i].size + "], Quantity: [" + cartArray[i].count + "], Product: [" + cartArray[i].name + "], Price: [" + cartArray[i].price + "], Subtotal: [" + "$" + cartArray[i].total + "] " + '\r\n' ;
  }


  var outputTable = "";
  for(var i in cartArray) {
    outputTable += "<tr>"
    + "<td width='70' class='text-md-center text-sm-left'>" + "<img src='" + cartArray[i].thumbnail + "' alt='IMG' class='img-fluid'>" + "</td>"
   + "<td align='left' style='font-size:11px;' class='text-left'>"  + cartArray[i].name +  "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].size + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].sku + "</td>"
    + "<td align='center' style='font-size:11px;font-weight:bold;' class='text-md-center text-sm-left'>" + cartArray[i].price + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].count + "</td>"
    + "<td align='right' style='font-size:11px;font-weight:bold;' class='text-md-right text-sm-left'>" + cartArray[i].total + "</td>"
    +  "</tr>" 
    ;
  }
  
  var outputShortOrder = "";
  for(var i in cartArray) {
    outputShortOrder += "Sku: [" + cartArray[i].sku + "], Quantity: [" + cartArray[i].count + "]; "
  }
  
  var outputshoppingCartShortOrderMin = "";
  for(var i in cartArray) {
    outputshoppingCartShortOrderMin += cartArray[i].sku + ", " + cartArray[i].count + "; "
  }
    $('#shoppingCartShortOrder').val(outputShortOrder);
  
  $('#shoppingCartShortOrderMin').val(outputshoppingCartShortOrderMin);
  
 // let taxAmount = shoppingCart.totalCart() * taxRate;
  //let checkoutTotal = shoppingCart.totalCart() + taxAmount;
  $('.show-cart').html(output);
  
  //document.getElementById("submit-payment").value = "Charge My Card $"+shoppingCart.totalCart().toFixed(2);
  $('#submit-payment').val("Charge My Card $"+shoppingCart.totalCart().toFixed(2));
  $('#cart_subtotal').val(shoppingCart.totalCart().toFixed(2));
  
  $('#calculated_total').val(shoppingCart.totalCart().toFixed(2));
  
 // $('#table-cart-total').val(shoppingCart.totalCart().toFixed(2));
  
  $('#shoppingCartList').val(JSON.stringify(cart));
  
  $('#shoppingCartListFormatted').val(output2);
  
  var tableCartTotal = shoppingCart.totalCart().toFixed(2)
  
  $('#shoppingCartListTable').val("<table class='table table-striped'>" + "<thead>" + "<tr>" + "<th>&nbsp;</th>" + "<th>Name</th>" + "<th style='text-align:center'>Size</th>" + "<th style='text-align:center'>Sku</th>" + "<th style='text-align:center'>Price</th>" + "<th style='text-align:center'>Quantity</th>" + "<th style='text-align:right'>Total</th>" + "</tr>" + "</thead>" + "<tbody class='label-receipt'>" + outputTable + "</tbody>" + "<tbody>" + "<tr class='totals'>" + "<td colspan='6'>" + "</td>" + "<td class='bg-success text-white font-weight-bold p-3 text-right total-cart-amount' id='table-cart-total-amount' style='text-align:center;font-size:11px;'>" + "Total: $" + tableCartTotal  + "</td>" + "</tr>" + "</tbody>" + "</table>");
  
  
  
  $('.total-cart').html("Total: $" + shoppingCart.totalCart().toFixed(2));
  $('#table-cart-total').html("Total: $" + shoppingCart.totalCart().toFixed(2));
  //$('.total-tax').html(taxAmount.toFixed(2));
  //$('.total-checkout').html(checkoutTotal.toFixed(2));
  $('.total-count').html(shoppingCart.totalCount());
  addToTotal()
}

 

// Add Tax
function addToTotal() {
let taxRate = .06;
  let taxAmount = 0;
 if($('#form_payment_state').val() == "FL"){
        taxAmount = shoppingCart.totalCart() * taxRate;
        $('.total-tax').html("$" +taxAmount.toFixed(2));
   		let checkoutTotal = shoppingCart.totalCart() + taxAmount;
   		$('.total-checkout').html("$" +checkoutTotal.toFixed(2));
   		$("#tax-wrap").css("display", "block");
   		$('#tax_amount').val(taxAmount.toFixed(2));
   		$('#calculated_total').val(checkoutTotal.toFixed(2));
   		$('#submit-payment').val("Charge My Card $"+checkoutTotal.toFixed(2));
   
   
   
   
   
   $( ".tax-total" ).css( "display", "table-row" );
   
   
   var cartArray = shoppingCart.listCart();
   var outputTable = "";
  for(var i in cartArray) {
    outputTable += "<tr>"
    + "<td width='70'>" + "<img src='" + cartArray[i].thumbnail + "' alt='IMG' class='img-fluid'>" + "</td>"
   + "<td align='left' style='font-size:11px;' class='text-md-center text-sm-left'>"  + cartArray[i].name +  "</td>"
    + "<td style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].size + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].sku + "</td>"
    + "<td align='center' style='font-size:11px;font-weight:bold;' class='text-md-center text-sm-left'>" + cartArray[i].price + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].count + "</td>"
    + "<td align='right' style='font-size:11px;font-weight:bold;' class='text-md-right text-sm-left'>" + cartArray[i].total + "</td>"
    +  "</tr>" 
    ;
  }
    $('#shoppingCartListTable').val("<table class='table table-striped'>" + "<thead>" + "<tr>" + "<th>&nbsp;</th>" + "<th>Name</th>" + "<th style='text-align:center'>Size</th>" + "<th style='text-align:center'>Sku</th>" + "<th style='text-align:center'>Price</th>" + "<th style='text-align:center'>Quantity</th>" + "<th style='text-align:right'>Total</th>" + "</tr>" + "</thead>" + "<tbody class='label-receipt'>" + outputTable + "</tbody>" + "<tbody>" + "<tr class='tax-total display-tax' id='recipt-tax-for-table' style='display: table-row !important;'>" + "<td colspan='6'>" + "</td>" + "<td class='text-black font-weight-bold py-2 px-3 additional-tax text-right' style='text-align:center;font-size:11px;'>" + "Tax $" + taxAmount.toFixed(2) + "</td>" + "</tr>" + "<tr class='totals'>" + "<td colspan='6'>" + "</td>" + "<td class='bg-success text-white font-weight-bold p-3 text-right total-cart-amount' id='table-cart-total-amount' style='text-align:center;font-size:11px;'>" + "Total: $" + checkoutTotal.toFixed(2)  + "</td>" + "</tr>" + "</tbody>" + "</table>");
   
   
   
   
   $('.additional-tax').html("Tax $" + taxAmount.toFixed(2));
   $('#total-cart-with-tax').html("Total: $" + checkoutTotal.toFixed(2));
   $('#table-cart-total').html("Total: $" + checkoutTotal.toFixed(2));
   tableCartTotal = checkoutTotal.toFixed(2)
   
      	} else if($('#form_payment_state').val() != "FL"){
          $('.total-checkout').html("$" +shoppingCart.totalCart().toFixed(2));
          $("#tax-wrap").css("display", "none");
          $('#tax_amount').val("");
          $('#calculated_total').val(shoppingCart.totalCart().toFixed(2));
          $('#submit-payment').val("Charge My Card $"+shoppingCart.totalCart().toFixed(2));
          $('#total-cart-with-tax').html("Total: $" + shoppingCart.totalCart().toFixed(2));
          $('#table-cart-total').html("Total: $" + shoppingCart.totalCart().toFixed(2));
          tableCartTotal = shoppingCart.totalCart().toFixed(2)
          
          $( ".tax-total" ).css( "display", "none" );
   
   var cartArray = shoppingCart.listCart();
   var outputTable = "";
  for(var i in cartArray) {
    outputTable += "<tr>"
    + "<td width='70'>" + "<img src='" + cartArray[i].thumbnail + "' alt='IMG' class='img-fluid'>" + "</td>"
   + "<td align='left' style='font-size:11px;' class='text-md-center text-sm-left'>"  + cartArray[i].name +  "</td>"
    + "<td style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].size + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].sku + "</td>"
    + "<td align='center' style='font-size:11px;font-weight:bold;' class='text-md-center text-sm-left'>" + cartArray[i].price + "</td>"
    + "<td align='center' style='font-size:11px;' class='text-md-center text-sm-left'>" + cartArray[i].count + "</td>"
    + "<td align='right' style='font-size:11px;font-weight:bold;' class='text-md-right text-sm-left'>" + cartArray[i].total + "</td>"
    +  "</tr>"
    ;
  }
   
   $('#shoppingCartListTable').val("<table class='table table-striped'>" + "<thead>" + "<tr>" + "<th>&nbsp;</th>" + "<th>Name</th>" + "<th style='text-align:center'>Size</th>" + "<th style='text-align:center'>Sku</th>" + "<th style='text-align:center'>Price</th>" + "<th style='text-align:center'>Quantity</th>" + "<th style='text-align:right'>Total</th>" + "</tr>" + "</thead>" + "<tbody class='label-receipt'>" + outputTable + "</tbody>" + "<tbody>" + "<tr class='totals'>" + "<td colspan='6'>" + "</td>" + "<td class='bg-success text-white font-weight-bold p-3 text-right total-cart-amount' id='table-cart-total-amount' style='text-align:center;font-size:11px;'>" + "Total: $" + tableCartTotal  + "</td>" + "</tr>" + "</tbody>" + "</table>");
     }
  
}
// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  var size = $(this).data('size')
  shoppingCart.removeItemFromCartAll(name, size);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  // DO NOT EDIT THIS ADDS NEW SIZES TO LIST
  var size = event.target.dataset.size;
  var sku = event.target.dataset.sku + "-" + size;
  var available = event.target.dataset.available;
  var productIdentifier = event.target.dataset.productIdentifier;
  var thumbnail = event.target.dataset.thumbnail;
  var image = event.target.dataset.image;
  var price = Number($(this).data('price'));
  shoppingCart.removeItemFromCart(name, price, size, sku, available, productIdentifier, thumbnail, image);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    // DO NOT EDIT THIS ADDS NEW SIZES TO LIST
    var size = event.target.dataset.size;
    var sku = event.target.dataset.sku + "-" + size;
    var available = event.target.dataset.available;
    var productIdentifier = event.target.dataset.productIdentifier;
    var thumbnail = event.target.dataset.thumbnail;
    var image = event.target.dataset.image;
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCartTwo(name, price, size, sku, available, productIdentifier, thumbnail, image);
    displayCart();
  })

  
  $('#form_payment_state').on("change", function(event) {
    console.log('change')
 //   var name = $(this).data('name')
    // DO NOT EDIT THIS ADDS NEW SIZES TO LIST
 //   var size = event.target.dataset.size;
 //   var sku = event.target.dataset.sku + "-" + size;
 //   var available = event.target.dataset.available;
 //   var productIdentifier = event.target.dataset.productIdentifier;
 //   var thumbnail = event.target.dataset.thumbnail;
 //   var image = event.target.dataset.image;
 //   var price = Number($(this).data('price'));
 //   shoppingCart.addItemToCartTwo(name, price, size, sku, available, productIdentifier, thumbnail, image);
    displayCart();
  })
  
// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var size = $(this).data('size');
   var sku = $(this).data('sku');
  var available = $(this).data('available');
   var productIdentifier = $(this).data('productIdentifier');
   var thumbnail = $(this).data('thumbnail');
   var image = $(this).data('image');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, size, sku, available, productIdentifier, image, thumbnail, count);
  displayCart();
});


  
$('#size-dropdown-637e8eb900f96e0cdcc568ea').on("change", function(event) {
    if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-637e8eb900f96e0cdcc568ea :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-637e8eb900f96e0cdcc568ea').on("change", function(event) {
    if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-637e8eb900f96e0cdcc568ea').on("change", function(event) {
    if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-637e8eb900f96e0cdcc568ea').on("change", function(event) {
    if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-637e8eb900f96e0cdcc568ea').on("change", function(event) {
    if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-637e8eb900f96e0cdcc568ea').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-637e8eb900f96e0cdcc568ea :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-637e8eb900f96e0cdcc568ea').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-637e8eb900f96e0cdcc568ea :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-637e8eb900f96e0cdcc568ea').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-637e8eb900f96e0cdcc568ea :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-637e8eb900f96e0cdcc568ea').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-637e8eb900f96e0cdcc568ea :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-637e8eb900f96e0cdcc568ea').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-637e8eb900f96e0cdcc568ea :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-637e8eb900f96e0cdcc568ea");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });



$('#size-dropdown-637319dff06f5b0e0861caaa').on("change", function(event) {
    if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-637319dff06f5b0e0861caaa :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-637319dff06f5b0e0861caaa').on("change", function(event) {
    if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-637319dff06f5b0e0861caaa :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-637319dff06f5b0e0861caaa').on("change", function(event) {
    if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-637319dff06f5b0e0861caaa :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-637319dff06f5b0e0861caaa').on("change", function(event) {
    if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-637319dff06f5b0e0861caaa :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-637319dff06f5b0e0861caaa').on("change", function(event) {
    if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-637319dff06f5b0e0861caaa :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-637319dff06f5b0e0861caaa').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-637319dff06f5b0e0861caaa :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-637319dff06f5b0e0861caaa').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-637319dff06f5b0e0861caaa :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-637319dff06f5b0e0861caaa').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-637319dff06f5b0e0861caaa :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-637319dff06f5b0e0861caaa').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-637319dff06f5b0e0861caaa :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-637319dff06f5b0e0861caaa').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-637319dff06f5b0e0861caaa :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-637319dff06f5b0e0861caaa");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });



$('#size-dropdown-637318d26119500d19e97b16').on("change", function(event) {
    if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-637318d26119500d19e97b16 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-637318d26119500d19e97b16').on("change", function(event) {
    if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-637318d26119500d19e97b16 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-637318d26119500d19e97b16').on("change", function(event) {
    if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-637318d26119500d19e97b16 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-637318d26119500d19e97b16').on("change", function(event) {
    if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-637318d26119500d19e97b16 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-637318d26119500d19e97b16').on("change", function(event) {
    if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-637318d26119500d19e97b16 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-637318d26119500d19e97b16').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-637318d26119500d19e97b16 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-637318d26119500d19e97b16");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-637318d26119500d19e97b16').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-637318d26119500d19e97b16 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-637318d26119500d19e97b16");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-637318d26119500d19e97b16').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-637318d26119500d19e97b16 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-637318d26119500d19e97b16");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-637318d26119500d19e97b16').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-637318d26119500d19e97b16 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-637318d26119500d19e97b16");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-637318d26119500d19e97b16').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-637318d26119500d19e97b16 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-637318d26119500d19e97b16");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });



$('#size-dropdown-637317cff104d90de82f4a59').on("change", function(event) {
    if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-637317cff104d90de82f4a59 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-637317cff104d90de82f4a59').on("change", function(event) {
    if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-637317cff104d90de82f4a59 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-637317cff104d90de82f4a59').on("change", function(event) {
    if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-637317cff104d90de82f4a59 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-637317cff104d90de82f4a59').on("change", function(event) {
    if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-637317cff104d90de82f4a59 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-637317cff104d90de82f4a59').on("change", function(event) {
    if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-637317cff104d90de82f4a59 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-637317cff104d90de82f4a59').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-637317cff104d90de82f4a59 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-637317cff104d90de82f4a59");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-637317cff104d90de82f4a59').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-637317cff104d90de82f4a59 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-637317cff104d90de82f4a59");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-637317cff104d90de82f4a59').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-637317cff104d90de82f4a59 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-637317cff104d90de82f4a59");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-637317cff104d90de82f4a59').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-637317cff104d90de82f4a59 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-637317cff104d90de82f4a59");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-637317cff104d90de82f4a59').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-637317cff104d90de82f4a59 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-637317cff104d90de82f4a59");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });



$('#size-dropdown-6373117b2b19213f982c07c0').on("change", function(event) {
    if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-6373117b2b19213f982c07c0 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-6373117b2b19213f982c07c0').on("change", function(event) {
    if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-6373117b2b19213f982c07c0 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-6373117b2b19213f982c07c0').on("change", function(event) {
    if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-6373117b2b19213f982c07c0 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-6373117b2b19213f982c07c0').on("change", function(event) {
    if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-6373117b2b19213f982c07c0 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-6373117b2b19213f982c07c0').on("change", function(event) {
    if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-6373117b2b19213f982c07c0 :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-6373117b2b19213f982c07c0').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-6373117b2b19213f982c07c0 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-6373117b2b19213f982c07c0");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-6373117b2b19213f982c07c0').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-6373117b2b19213f982c07c0 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-6373117b2b19213f982c07c0");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-6373117b2b19213f982c07c0').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-6373117b2b19213f982c07c0 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-6373117b2b19213f982c07c0");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-6373117b2b19213f982c07c0').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-6373117b2b19213f982c07c0 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-6373117b2b19213f982c07c0");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-6373117b2b19213f982c07c0').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-6373117b2b19213f982c07c0 :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-6373117b2b19213f982c07c0");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });



$('#size-dropdown-6372a9ba9fee0c012f49b89b').on("change", function(event) {
    if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-6372a9ba9fee0c012f49b89b :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-two-6372a9ba9fee0c012f49b89b').on("change", function(event) {
    if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-three-6372a9ba9fee0c012f49b89b').on("change", function(event) {
    if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "3X");
       } 
    
 });
$('#size-dropdown-four-6372a9ba9fee0c012f49b89b').on("change", function(event) {
    if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#size-dropdown-all-6372a9ba9fee0c012f49b89b').on("change", function(event) {
    if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "S"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "S");
       } else if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "M"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "M");
       } else if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "L"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "L");
       } else if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "XL"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "XL");
       } else if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "2X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "2X");
       } else if($('#size-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val() == "3X"){
      var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-size", "3X");
       } 
    
 });

$('#quantity-dropdown-6372a9ba9fee0c012f49b89b').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-6372a9ba9fee0c012f49b89b :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-two-6372a9ba9fee0c012f49b89b').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-two-6372a9ba9fee0c012f49b89b :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-two-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-three-6372a9ba9fee0c012f49b89b').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-three-6372a9ba9fee0c012f49b89b :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-three-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });
$('#quantity-dropdown-four-6372a9ba9fee0c012f49b89b').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-four-6372a9ba9fee0c012f49b89b :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-four-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });

$('#quantity-dropdown-all-6372a9ba9fee0c012f49b89b').on("change", function(event) {
  let quantityProduct = $('#quantity-dropdown-all-6372a9ba9fee0c012f49b89b :selected').val()
    var preview = document.getElementById("add-to-cart-modal-btn-all-6372a9ba9fee0c012f49b89b");
      preview.setAttribute("data-quantity", quantityProduct);
    
 });




displayCart();
  })




var queryForm = function(settings){
  var reset = settings && settings.reset ? settings.reset : false;
  var self = window.location.toString();
  var querystring = self.split("?");
  if (querystring.length > 1) {
    var pairs = querystring[1].split("&");
    for (i in pairs) {
      var keyval = pairs[i].split("=");
      if (reset || sessionStorage.getItem(keyval[0]) === null) {
        sessionStorage.setItem(keyval[0], keyval[1]);
      }
    }
  }
  var hiddenFields = document.querySelectorAll("input[type=hidden]");
  for (var i=0; i<hiddenFields.length; i++) {
    var param = sessionStorage.getItem(hiddenFields[i].id);
    if (param) document.getElementById(hiddenFields[i].id).value = param;
  }
}
queryForm();


 