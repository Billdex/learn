package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type InnerStruct struct {
	Msg string
}

type JsonResp struct {
	IntParam         int
	FloatParam       float64
	StringParam      string
	BoolParam        bool
	StructParam      InnerStruct
	ArrayIntParam    []int
	ArrayFloatParam  []float64
	ArrayStringParam []string
	ArrayBoolParam   []bool
	ArrayStructParam []InnerStruct
	SimpleMap        map[string]string
}

var resp = JsonResp{
	IntParam:    1,
	FloatParam:  3.1415926,
	StringParam: "this is a test string",
	BoolParam:   true,
	StructParam: InnerStruct{
		Msg: "Hello world",
	},
	ArrayIntParam:    []int{1, 2, 3, 4, 5},
	ArrayFloatParam:  []float64{1.1, 2.2, 3.3, 4.4, 5.5},
	ArrayStringParam: []string{"string1", "string2", "string3", "string4", "string5"},
	ArrayBoolParam:   []bool{true, false},
	ArrayStructParam: []InnerStruct{{Msg: "struct1"}, {Msg: "struct2"}, {Msg: "struct3"}, {Msg: "struct4"}, {Msg: "struct5"}},
	SimpleMap:        map[string]string{"aaa": "AAA", "bbb": "BBB", "ccc": "CCC", "ddd": "DDD", "eee": "EEE"},
}

func JsonHelloHandler(c *gin.Context) {

}

func JsonBigHandler(c *gin.Context) {
	c.JSON(http.StatusOK, resp)
}
