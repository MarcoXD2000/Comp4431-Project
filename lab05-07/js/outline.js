(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var valueRGx = 0, valueRGy = 0;
                var valueGGx = 0, valueGGy = 0;
                var valueBGx = 0, valueBGy = 0;

                for (var j = -1; j <= 1; ++j)
                    for (var i = -1; i <= 1; ++i){
                        var pixel = imageproc.getPixel(inputData, x+i, y+j);
                        valueRGx += pixel.r * Gx[j+1][i+1];
                        valueRGy += pixel.r * Gy[j+1][i+1];

                        valueGGx += pixel.g * Gx[j+1][i+1];
                        valueGGx += pixel.g * Gy[j+1][i+1];

                        valueBGx += pixel.b * Gx[j+1][i+1];
                        valueBGx += pixel.b * Gy[j+1][i+1];

                    }
                var value = Math.max(Math.hypot(valueRGx, valueRGy), Math.hypot(valueGGx, valueGGy), Math.hypot(valueBGx, valueBGy))
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = value<threshold?0:255;
                outputData.data[i + 1] = value<threshold?0:255;
                outputData.data[i + 2] = value<threshold?0:255;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
