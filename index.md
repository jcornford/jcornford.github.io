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
Hi, I'm Jonathan, about to finish my PhD in neuroscience at Queen Square, University College London. I'm interested in how
 single neurons work, machine learning, and data science. After a few blog posts, eventually I intend to have a play with
  using [**spiking**](Izhikevich_model/) neural networks to solve machine learning problems.
 
 

### So why this website?
My background is Biological, specifically Physiological Sciences (aka Medicine without the troublesome ill people). As such,
 my undergraduate degree did not involve huge amounts of maths. As my interest in machine learning and datascience grew,
 I learned the maths along the way, but I found when reading articles on machine learning that quite often the reader is
 assumed to be pre-exposed to the mathematical topics under discussion. So I'd then have to go somewhere else and read the maths,
 breaking things up, and I'd only come back to the original page or notes if I remembered!

 Alternatively, things might be laser-focused on concepts
 or implementation details, which can be really great, e.g. [Introduction to Statistical Learning](http://www-bcf.usc.edu/~gareth/ISL/),
  but I often wished for more details. However, if you go looking for those details, again generally a prior familiarity 
  with the maths is assumed - [Elements of Statisitical Learning](https://statweb.stanford.edu/~tibs/ElemStatLearn/)
 is a pretty big step up from [ISLR](http://www-bcf.usc.edu/~gareth/ISL/) :] ( half of page 45, lines 3.3 to 3.6, is the entire focus of [posts 2](2017-01-07-least-squares-for-dummies/) and [2a](2017-01-08-scalar-by-vector-derivatives-for-least-squares)). 
 
 
So, this [blog](/blog/) is intended to be in-between the two options, to cross that bridge, filling in the details I wanted
 when first reading about a given topic. I also would like to use coding to inform the maths, as maths really started making
  more sense to me when thinking in terms of code. 

<a href="{{ blog | prepend: site.baseurl }}">