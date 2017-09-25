//<!--------------------------------------------------------------------------->
//<!--    Based on work from Garry Smith -->
//<!--    https://www.bignerdranch.com/blog/music-visualization-with-d3-js/  -->
//<!--------------------------------------------------------------------------->

//$(document).ready(function () {

    //    Now make circular equalizer
    var samplebins = 200;
    var frequencyData = new Uint8Array(samplebins+1); //add 1 to ensure circle "closes"!
    // Continuously loop and update chart with frequency data.
    function renderChart() {
           requestAnimationFrame(renderChart);
           // Copy frequency data to frequencyData array.
           analyser.getByteFrequencyData(frequencyData);
        }; //renderchart
    // Run the loop
    renderChart();  
    
    
////////////////  CIRCULAR EQUALIZER BY MANIPULATING THE RADIUS of CIRCLES
//<!--////////////////////////////////////////////////////////////////////////////////-->
//<!--     CIRCLES WITH CHANGING RADIUS-->
//<!--     // based on https://bl.ocks.org/mbostock/2d466ec3417722e3568cd83fc35338e3-->
//<!--////////////////////////////////////////////////////////////////////////////////-->

//    var svg = d3.select("#content").select("svg"),
    var svg = d3.select("#colonies"),
                        width = +svg.attr("width"),
                        height = +svg.attr("height"),
                        angles = d3.range(0, 2 * Math.PI, Math.PI / 120); //ensure same (-1) or smaller number as frequency array!
    
    var defs = svg.append("defs");    
    //Append a radialGradient element to the defs and give it a unique id
    //  From: https://www.visualcinnamon.com/2016/05/data-based-svg-gradient-d3.html
    var radialGradient = defs.append("radialGradient")
        .attr("id", "radial-gradient")
        .attr("cx", "50%")    //The x-center of the gradient, same as a typical SVG circle
        .attr("cy", "50%")    //The y-center of the gradient
        .attr("r", "50%");   //The radius of the gradient, an offset of 100% ends where you've set this radius

    //Add colors to make the gradient appear like a Sun:
    //  From: https://www.visualcinnamon.com/2016/05/data-based-svg-gradient-d3.html
//    mycolor = d3.rgb("#E0B463"); // "Sun" (with 1 lighter and 1.75 darker)
    mycolor = d3.rgb("#3a1c05"); // "Sun" (with 1 lighter and 1.75 darker)
    radialGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", mycolor.brighter(2.5));
    radialGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", mycolor);
    radialGradient.append("stop")
        .attr("offset", "90%")
        .attr("stop-color", mycolor.darker(2)); 

// NOW DRAW THIS CIRCLE EQUALIZER!
                    var path = svg.append("g")
                        .attr("zIndex",0)
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                        .style("fill", "url(#radial-gradient)")  // GRADIENT
                        .style("filter", "url(#yellow-glow)")  // GLOW!
                        .attr("stroke-width", 2)
                        .attr("stroke-linejoin", "round")
                        .selectAll("path")
                        .data(["pink","red"])
                        .enter().append("path")
                        .style("mix-blend-mode", "darken")
                        .datum(function(d, i) {
                          return d3.radialLine()
                              .curve(d3.curveLinearClosed)
                              .angle(function(a) { return a; })
                              .radius(function(a,i) {
//                                    return 180 +.65*frequencyData[Math.round(a*.5*samplebins/Math.PI)] + Math.pow(frequencyData[Math.round(a*.5*samplebins/Math.PI)],1.02);
                                      return 180 + 0.3*Math.pow(frequencyData[Math.round(a*.5*samplebins/Math.PI)],1.15);
                                  
                                  
                                    });
                        });
                       
                    d3.timer(function() {
                            path.attr("d", function(d) {
                                        return d(angles);
                            });
                    });    
    
//    });   // CLOSING DOCUMENT READY FUNCTION!