package main

import (
	"encoding/binary"
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"log"
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
		log.Println(err)
		return
	}
	resultFile, err := os.Create("result.png")
	if err != nil {
		log.Println("create file fail:", err)
		return
	}
	png.Encode(resultFile, img)
	file, err = os.Open("ir_0.raw")
	if err != nil {
		fmt.Println("open file error:", err)
		return
	}
	defer file.Close()
	img, err = Unsigned16ToGray(file, 540, 640)
	if err != nil {
		fmt.Println(err)
		return
	}
	resultFile, err = os.Create("result_ir.png")
	if err != nil {
		fmt.Println("create file fail:", err)
		return
	}
	png.Encode(resultFile, img)
	file, err = os.Open("depth_0.raw")
	if err != nil {
		fmt.Println("open file error:", err)
		return
	}
	defer file.Close()
	img, err = Unsigned16ToGray(file, 540, 640)
	if err != nil {
		log.Println(err)
		return
	}
	resultFile, err = os.Create("result_depth.png")
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
	if lens != xSize*ySize*3 {
		log.Println("lens:", lens, "all size:", xSize*ySize*3)
		return nil, errors.New("图片尺寸不符合要求")
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

func Unsigned16ToGray(reader io.Reader, xSize int, ySize int) (image.Image, error) {
	buf := make([]byte, xSize*ySize*2)
	lens, err := reader.Read(buf)
	if err == io.EOF || lens < 0 {
		return nil, errors.New("读取reader失败")
	}
	if lens != xSize*ySize*2 {
		log.Println("lens:", lens, "all size:", xSize*ySize*2)
		return nil, errors.New("图片尺寸不符合要求")
	}
	uint16Buf := make([]uint16, xSize*ySize)
	var max uint16 = 0
	for i := 0; i < xSize*ySize; i++ {
		uint16Buf[i] = binary.LittleEndian.Uint16([]byte{buf[i*2], buf[i*2+1]})
		if uint16Buf[i] > max {
			max = uint16Buf[i]
		}
	}
	img := image.NewGray(image.Rect(0, 0, xSize, ySize))
	for i := 0; i < ySize; i++ {
		for j := 0; j < xSize; j++ {
			p := i*xSize + j
			gray := uint8(int(uint16Buf[p]) * 255 / int(max))
			img.Set(j, i, color.Gray{Y: gray})
		}
	}
	return img, nil
}
