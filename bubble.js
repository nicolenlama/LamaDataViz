	const margin = {top: 40, right: 10, bottom: 40, left: 50},
    width = 800,
		height = 500,
    axisPadding = height + 5;
    

	let x = d3.scaleLinear().range([0, width]),
		  y = d3.scaleLinear().range([height,0]);

	let xAxis = d3.axisBottom(x),
		  yAxis = d3.axisLeft(y)

	const svg = d3.select("#chart")
		.append("svg")
		.attr("height", height  + margin.top + margin.bottom)
		.attr("width", width + margin.right + margin.left)
		.append("g")
		.attr("transform", "translate(" + margin.left+ "," + margin.right +  ")");

	
function update(data) {

    var t = d3.transition()
        .duration(100);
  
		data.forEach( function(d){ //Format Data so that strings are floats
      d.Energy = +d.Energy;
			d.rms = +d.rms;}
			);
			
		//Scale the range of data to svg
		x.domain([ 0, d3.max(data, d => d.rms)])
		y.domain([d3.min(data, d => d.Energy) , d3.max(data, d => d.Energy)])
  
  svg.selectAll('.description').remove();
  
	var circles = svg.selectAll('.description')
      .data(data)
			.enter()
      .append("circle")
			.attr("class", "description")
			.attr("r", 3)
			.attr("fill","indianred")
			.attr("cx", d => x(d.rms))
			.attr("cy", d => y(d.Energy))
      .on("mouseover" , function(){ d3.select(this).attr('fill', 'orange');tooltip.style("display",null)})
      .on("mouseout" , function(){ d3.select(this).attr('fill', 'indianred');tooltip.style("display","none"); })
      .on("mousemove", function(d) {
        			d3.select("#myCheckbox").on("change",update);
		         	update(d);
		    	function update(d){
          if(d3.select("#myCheckbox").property("checked")){
            tooltip.select("text").text(d.description + " | Energy: " + d.Energy + " | RMSD: " + d.rms + ' | RG: '+ d.RG);
          } else {
            tooltip.select("text").text(d.description + " | Energy: " + d.Energy + " | RMSD: " + d.rms);
          }	
        } 
      });
  
  
    svg.selectAll(".axis").remove();
		//Add X and Y axis
		svg.append("g")
      .attr("class", "y axis")
			.attr("transform", "translate(0,0)")
      .transition(t)
			.call(yAxis)
      
  
    svg.append("g")
			.attr("class", "x axis")
      .attr("transform", "translate(0," + axisPadding + ")")
      .transition(t)
      .call(xAxis.tickSize(5));

  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top) + ")")
      .style("text-anchor", "middle")
      .text("RMSD");
    
      // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Rosetta Score (Energy)");   



 var tooltip = svg.append("svg")
      .attr("class", "tooltip")
      .style("display", "none");
	
  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "top")
    .attr("font-size", "100px")
    .attr("fontFamily" ,"Helvetica Neue")
    .attr("font-weight", "regular");

} //end of update
//console.log(d3.select('#dropDown').property('value'));

d3.queue()
    .defer(d3.csv, "fakeData.csv")
    .defer(d3.csv, "data.tpp.csv")
	.defer(d3.csv, "data.tpp.clust.50.csv")
	.defer(d3.csv, "data.tpp.clust.10.csv")
	.defer(d3.csv, "data.tpp.clust.100.csv")
    .defer(d3.csv, "data.tpp.withLigand.csv")
    .defer(d3.csv, "data.tpp.withLigand.clust.csv")
    .defer(d3.csv, "data.fmnno.csv")
	.defer(d3.csv, "data.fmnno.clust50.csv")
	.defer(d3.csv, "data.fmnno.clust.10.csv")
	.defer(d3.csv, "data.fmnno.clust100.csv")
    .defer(d3.csv, "data.FMN.csv")
	.defer(d3.csv, "data.1hc8.csv")
    .defer(d3.csv, "data.1hc8.clust.csv")
    .defer(d3.csv, "data.2n3r.csv")
    .defer(d3.csv, "data.2n3r.clust.50.csv")
	.defer(d3.csv, "data.2mtj.csv")
	.defer(d3.csv, "data.2mtj.clust.csv")
  	.await(init);

function init(error, fake, tpp, tppC, tppCl, tppCm, tppL, tppLC, fmn, fmnC, fmnCl, fmnCm, fmnL, h, hC, n, nC, m, mC) {
		if (error) throw error; 
    //console.log(d3.select("#dropDown").property('value'))
    var data =d3.select("#dropDown").property('value')
    update(eval(data));
    d3.select('#dropDown').on('change', function() {
    update(eval(d3.select('#dropDown').property('value')))
});  

  
};// End of init()

