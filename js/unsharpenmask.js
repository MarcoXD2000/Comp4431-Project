(function(imageproc) {
    "use strict";

    /*
     * Apply Kuwahara filter to the input data
     */
    imageproc.gaussian = function(inputData, outputData, size) {
        console.log("Applying Gaussian blur...");

        /*
         * TODO: You need to extend the kuwahara function to include different
         * sizes of the filter
         *
         * You need to clearly understand the following code to make
         * appropriate changes
         */

        /*
         * An internal function to find the regional stat centred at (x, y)
         */
        function regionStat(x, y) {
            // Find the mean colour and brightness
            var meanR = 0, meanG = 0, meanB = 0;
            var meanValue = 0;
            for (var j = -parseInt(size/4); j <= parseInt(size/4); j++) {
                for (var i = -parseInt(size/4); i <= parseInt(size/4); i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);

                    // For the mean colour
                    meanR += pixel.r;
                    meanG += pixel.g;
                    meanB += pixel.b;

                    // For the mean brightness
                    meanValue += (pixel.r + pixel.g + pixel.b) / 3;
                }
            }
            meanR /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanG /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanB /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanValue /= (parseInt(size/2)+1)*(parseInt(size/2)+1);

            // Find the variance
            var variance = 0;
            for (var j = -parseInt(size/4); j <= parseInt(size/4); j++) {
                for (var i = -parseInt(size/4); i <= parseInt(size/4); i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);
                    var value = (pixel.r + pixel.g + pixel.b) / 3;

                    variance += Math.pow(value - meanValue, 2);
                }
            }
            variance /= (parseInt(size/2)+1)*(parseInt(size/2)+1);

            // Return the mean and variance as an object
            return {
                mean: {r: meanR, g: meanG, b: meanB},
                variance: variance
            };
        }

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var region = regionStat(x, y);
                var sigma = Math.sqrt(region.variance);
                var kernel = [];
                var mean = size/2;
                var sum = 0.0; // For accumulating the kernel values

                for (var a = 0; a < size; ++a){ 
                    var temp = [];
                    for (var b = 0; b < size; ++b) {
                        temp.push(parseFloat(Math.exp( -0.5 * (Math.pow((a-mean)/sigma, 2.0) + Math.pow((b-mean)/sigma,2.0)) )
                                        / (2 * Math.PI * sigma * sigma)));
                
                        // Accumulate the kernel values

                        sum += temp[b];
                    }
                    kernel.push(temp);
                }

                // Normalize the kernel
                for (var a = 0; a < size; ++a) 
                    for (var b = 0; b < size; ++b)
                        kernel[a][b] /= sum;

                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                var rValue = 0, gValue = 0, bValue = 0;
                for (var j = 0-parseInt(size/2); j <= parseInt(size/2); j++) {
                    for (var i = 0-parseInt(size/2); i <= parseInt(size/2); i++) {
                        var pixelValues = imageproc.getPixel(inputData, x+i, y+j, "extend");
                        rValue += pixelValues.r * kernel[j+parseInt(size/2)][i+parseInt(size/2)]; 
                        gValue += pixelValues.g * kernel[j+parseInt(size/2)][i+parseInt(size/2)]; 
                        bValue += pixelValues.b * kernel[j+parseInt(size/2)][i+parseInt(size/2)];
                    }
                }
                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = rValue;
                outputData.data[i + 1] = gValue;
                outputData.data[i + 2] = bValue;
            }
        }
    }
 
    imageproc.unsharpen = function(inputData, outputData, size, radius, amount, threshold) {
        console.log("Applying unsharpen mask...");

        /*
         * TODO: You need to extend the unsharpen function to include different
         * sizes of the filter
         *
         * You need to clearly understand the following code to make
         * appropriate changes
         */

        /*
         * An internal function to find the regional stat centred at (x, y)
         */
        function regionStat(x, y) {
            // Find the mean colour and brightness
            var meanR = 0, meanG = 0, meanB = 0;
            var meanValue = 0;
            for (var j = -parseInt(size/4); j <= parseInt(size/4); j++) {
                for (var i = -parseInt(size/4); i <= parseInt(size/4); i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);

                    // For the mean colour
                    meanR += pixel.r;
                    meanG += pixel.g;
                    meanB += pixel.b;

                    // For the mean brightness
                    meanValue += (pixel.r + pixel.g + pixel.b) / 3;
                }
            }
            meanR /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanG /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanB /= (parseInt(size/2)+1)*(parseInt(size/2)+1);
            meanValue /= (parseInt(size/2)+1)*(parseInt(size/2)+1);

            // Find the variance
            var variance = 0;
            for (var j = -parseInt(size/4); j <= parseInt(size/4); j++) {
                for (var i = -parseInt(size/4); i <= parseInt(size/4); i++) {
                    var pixel = imageproc.getPixel(inputData, x + i, y + j);
                    var value = (pixel.r + pixel.g + pixel.b) / 3;

                    variance += Math.pow(value - meanValue, 2);
                }
            }
            variance /= (parseInt(size/2)+1)*(parseInt(size/2)+1);

            // Return the mean and variance as an object
            return {
                mean: {r: meanR, g: meanG, b: meanB},
                variance: variance
            };
        }



        //blur
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var region = regionStat(x, y);
                var sigma = Math.sqrt(region.variance);
                var kernel = [];
                var mean = size/2;
                var sum = 0.0; // For accumulating the kernel values

                for (var a = 0; a < size; ++a){ 
                    var temp = [];
                    for (var b = 0; b < size; ++b) {
                        temp.push(parseFloat(Math.exp( -0.5 * (Math.pow((a-mean)/sigma, 2.0) + Math.pow((b-mean)/sigma,2.0)) )
                                        / (2 * Math.PI * sigma * sigma)));
                
                        // Accumulate the kernel values

                        sum += temp[b];
                    }
                    kernel.push(temp);
                }

                // Normalize the kernel
                for (var a = 0; a < size; ++a) 
                    for (var b = 0; b < size; ++b)
                        kernel[a][b] /= sum;

                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                var rValue = 0, gValue = 0, bValue = 0;
                for (var j = 0-parseInt(size/2); j <= parseInt(size/2); j++) {
                    for (var i = 0-parseInt(size/2); i <= parseInt(size/2); i++) {
                        var pixelValues = imageproc.getPixel(inputData, x+i, y+j, "extend");
                        rValue += pixelValues.r * kernel[j+parseInt(size/2)][i+parseInt(size/2)]; 
                        gValue += pixelValues.g * kernel[j+parseInt(size/2)][i+parseInt(size/2)]; 
                        bValue += pixelValues.b * kernel[j+parseInt(size/2)][i+parseInt(size/2)];
                    }
                }
                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = rValue;
                outputData.data[i + 1] = gValue;
                outputData.data[i + 2] = bValue;
            }
        }
        //end blur

        //subtract details
        var subtractedDetails = imageproc.createBuffer(outputData);

        for (var i = 0; i < inputData.data.length; i += 4){

            //R
            outputData.data[i] = inputData.data[i] - outputData.data[i];
            if (outputData.data[i] > threshold)
                subtractedDetails.data[i] = outputData.data[i];
            else
                subtractedDetails.data[i] = 0;

            //G
            outputData.data[i + 1] = inputData.data[i + 1] - outputData.data[i + 1];
            if (outputData.data[i + 1] > threshold)
                subtractedDetails.data[i + 1] = outputData.data[i + 1];
            else
                subtractedDetails.data[i + 1] = 0;

            //B
            outputData.data[i + 2] = inputData.data[i + 2] - outputData.data[i + 2];
            if (outputData.data[i + 2] > threshold)
                subtractedDetails.data[i + 2] = outputData.data[i + 2];
            else
                subtractedDetails.data[i + 2] = 0;
                
                
                outputData.data[i]     = inputData.data[i] + subtractedDetails.data[i]*amount;
                outputData.data[i + 1] = inputData.data[i + 1] + subtractedDetails.data[i + 1]*amount;
                outputData.data[i + 2] = inputData.data[i + 2] + subtractedDetails.data[i + 2]*amount;

                for(var b = -parseInt(size/2); b <= radius/2; b++){
                    for(var a = -parseInt(size/2); a <= radius/2; a ++){
                        
                    }
                }

                if (outputData.data[i] > 255) outputData.data[i] = 255;
                if (outputData.data[i+1] > 255) outputData.data[i+1] = 255;
                if (outputData.data[i+2] > 255) outputData.data[i+2] = 255;

        }
        //end subtract details
    }

}(window.imageproc = window.imageproc || {}));