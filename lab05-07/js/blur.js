(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
        switch (kernelSize){
            case 3: kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];
            break;

            case 5: kernel = [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1] ];
            break;

            case 7: kernel = [ [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1] ];
            break;

            case 9: kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
            break;
        }
        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                var rValue = 0, gValue = 0, bValue = 0;
                for (var j = 0-parseInt(kernelSize/2); j <= parseInt(kernelSize/2); j++) {
                    for (var i = 0-parseInt(kernelSize/2); i <= parseInt(kernelSize/2); i++) {
                        var pixelValues = imageproc.getPixel(inputData, x+i, y+j, "extend");
                        rValue += pixelValues.r * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)]; 
                        gValue += pixelValues.g * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)]; 
                        bValue += pixelValues.b * kernel[j+parseInt(kernelSize/2)][i+parseInt(kernelSize/2)];
                    }
                }
                // Then set the blurred result to the output data
                
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = rValue/(kernelSize*kernelSize);
                outputData.data[i + 1] = gValue/(kernelSize*kernelSize);
                outputData.data[i + 2] = bValue/(kernelSize*kernelSize);
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
