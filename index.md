---
layout: default
title: Jonathan Cornford
---

<style>
.banner_image {
      padding-top: 20px;     
 }
 .image_container { 
   position: relative; 
   
   width: 100%; /* for IE 6 */
}
p span{
position: absolute;
   text-align:center;
   left: 0%;
   bottom:10%;
   color: white; 
   font:  25px  'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue','Open Sans', 'Lora','Arial', 'Times New Roman'; 
   letter-spacing: 0px;  
   background: rgb(0, 0, 0); /* fallback color */
   background: rgba(0, 0, 0, 0.5);
   padding: 5px; 

}
 h1 { 
   position: absolute;
   text-align:center;
   
   left: 0%;
   bottom:25%;
   //width: 100%; 
}
 h1 span { 
   color: white; 
   font:  45px  'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue','Open Sans', 'Lora','Arial', 'Times New Roman'; 
   letter-spacing: 0px;  
   background: rgb(0, 0, 0); /* fallback color */
   background: rgba(0, 0, 0, 0.5);
   padding: 5px; 
}
@media (max-width: 400px){

    h1 span{
    font-size:30px;
    }
    p span{
    font-size:15px;
    bottom:5%;
    }
    #welcome-to-my-home-page,#why-this-website {
    font-size:25px;
    }
}
</style>

<div class="image_container">
<img class= "banner_image" src="img/color_cropped.jpg">
<h1><span>Jonathan Cornford </span></h1>
<p><span> PhD Neuroscience, UCL</span></p>

</div>


![my-mugshot](/img/photojc.jpg){:style="float: left;margin-right: 15px;margin-top: 0px;"}

### Welcome!
Hi, I'm Jonathan, I've just finished my PhD in neuroscience at University College London. I'm interested in how
 the brain and single neurons work, neural networks, artificial intelligence and data science. 

<a href="{{ blog | prepend: site.baseurl }}">
