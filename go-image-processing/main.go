package main

import (
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"os"
)

func main() {
	file, err := os.Open("rgb_0.raw")
	if err != nil {
		fmt.Println("open file error:", err)
		return
	}
	defer file.Close()
	img, err := BGRPlannerToRGB(file, 736, 864)
	if err != nil {
		fmt.Println(err)
		return
	}
	resultFile, err := os.Create("result.png")
	if err != nil {
		fmt.Println("create file fail:", err)
		return
	}
	png.Encode(resultFile, img)

}

// BGRPlanner格式Raw转rgb格式Image
func BGRPlannerToRGB(reader io.Reader, xSize int, ySize int) (image.Image, error) {
	buf := make([]byte, xSize*ySize*3)
	lens, err := reader.Read(buf)
	if err == io.EOF || lens < 0 {
		return nil, errors.New("读取reader失败")
	}
	img := image.NewRGBA(image.Rect(0, 0, xSize, ySize))
	for i := 0; i < ySize; i++ {
		for j := 0; j < xSize; j++ {
			p := (i*xSize + j) * 3
			b := p
			g := p + 1
			r := p + 2
			img.Set(j, i, color.RGBA{B: buf[b], G: buf[g], R: buf[r], A: 255})
		}
	}
	return img, nil
}
