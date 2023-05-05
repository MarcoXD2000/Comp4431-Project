(function(imageproc) {
    "use strict";

    /*
     * Apply unsharpen to the input data
     */
    imageproc.unsharpen = function(inputData, outputData, kernelSize, radius, amount, threshold) {
        console.log("Applying unsharpen...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
        switch (kernelSize){
            case 3: kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
            break;

            case 7: kernel = [ [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1] ];
            break;

            case 11: kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] ];
            break;
        }
        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */

        var sigma = 1, mean = kernelSize/2, sum = 0

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                var rValue = 0, gValue = 0, bValue = 0;
                for (var j = 0-parseInt(kernelSize/2); j <= parseInt(kernelSize/2); j++) {
                    /*for (var i = 0-parseInt(kernelSize/2); i <= parseInt(kernelSize/2); i++) {
                        var pixelValues = imageproc.getPixel(inputData, x+i, y+j, "extend");
                        rValue = pixelValues.r * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)]; 
                        gValue = pixelValues.g * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)]; 
                        bValue = pixelValues.b * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)];
                    }*/
                }
                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = rValue/(sum);
                outputData.data[i + 1] = gValue/(sum);
                outputData.data[i + 2] = bValue/(sum);
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));