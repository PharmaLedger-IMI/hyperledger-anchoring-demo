package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
)

// AnchorChaincode implementation
type AnchorChaincode struct {
}

type anchor struct {
	ObjectType  string `json:"docType"`     // defined as anchor value, in order to find all anchor type in state db
	AnchorKey   string `json:"anchorkey"`   // anchor url or the key by which an anchor is found
	AnchorValue string `json:"anchorvalue"` // content of the anchor
}

// ===================================================================================
// Main
// ===================================================================================
func main() {

	server := &shim.ChaincodeServer{
		CCID:    os.Getenv("CHAINCODE_CCID"),
		Address: os.Getenv("CHAINCODE_ADDRESS"),
		CC:      new(AnchorChaincode),
		TLSProps: shim.TLSProperties{
			Disabled: true,
		},
	}

	// Start the chaincode external server
	err := server.Start()

	if err != nil {
		fmt.Printf("Error starting Anchor chaincode: %s", err)
	}
}

// Init initializes chaincode
// ===========================
func (t *AnchorChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// Invoke - Our entry point for Invocations
// Chaincode invoke methods are not called directlly, but passed as function name with parameters
// ========================================
func (t *AnchorChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	//get the function to execute with args
	function, args := stub.GetFunctionAndParameters()
	fmt.Println("invoked function name " + function)

	//handle anchor functions
	if function == "AddAnchor" {
		return t.addAnchor(stub, args)
	} else if function == "UpdateAnchor" {
		return t.updateAnchor(stub, args)
	} else if function == "DeleteAnchor" {
		return t.deleteAnchor(stub, args)
	} else if function == "GetAnchor" {
		return t.getAnchor(stub, args)
	}

	//log that we didnt found the function
	fmt.Println("Function name : " + function + " was not found !")
	//return error
	return shim.Error("Received unknown function invocation")
}

// ============================================================
// addAnchor will add an anchor to the ledger. In case it exists, it will raise an error.
// ============================================================
func (t *AnchorChaincode) addAnchor(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//expect 2 args : anchorUrl and anchorValue
	if len(args) != 2 {
		return shim.Error("Expected 2 arguments. anchorUrl and anchorValue")
	}
	fmt.Printf("args %s : %s\n", args[0], args[1])

	anchorURL, anchorValue := args[0], args[1]

	anchorAsBytes, err := stub.GetState(anchorURL)
	if anchorAsBytes != nil {
		return shim.Error("Anchor already exists: " + anchorURL)
	}

	objectType := "anchor"
	anchor := &anchor{objectType, anchorURL, anchorValue}
	anchorAsBytes, err = json.Marshal(anchor)
	if err != nil {
		return shim.Error(err.Error())
	}

	//store the anchor
	err = stub.PutState(anchorURL, anchorAsBytes)

	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Println("Finshed AddAnchor.")
	return shim.Success(nil)

}

// ============================================================
// updateAnchor will update an anchor to the ledger. In case it doesn't exists, it will raise an error.
// ============================================================
func (t *AnchorChaincode) updateAnchor(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//expect 2 args : anchorUrl and anchorValue
	if len(args) != 2 {
		return shim.Error("Expected 2 arguments. anchorUrl and anchorValue")
	}
	fmt.Printf("args %s : %s\n", args[0], args[1])

	anchorURL, anchorValue := args[0], args[1]

	anchorAsBytes, err := stub.GetState(anchorURL)
	if err != nil {
		return shim.Error(err.Error())
	} else if anchorAsBytes == nil {
		return shim.Error("Anchor don't exist " + anchorURL)
	}

	objectType := "anchor"
	anchor := &anchor{objectType, anchorURL, anchorValue}
	anchorAsBytes, err = json.Marshal(anchor)
	if err != nil {
		return shim.Error(err.Error())
	}

	//store the anchor
	err = stub.PutState(anchorURL, anchorAsBytes)

	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Println("Finished UpdateAnchor.")
	return shim.Success(nil)
}

// ============================================================
// deleteAnchor will delete an anchor from the ledger. In case it doesn't exists, it will raise an error.
// ============================================================
func (t *AnchorChaincode) deleteAnchor(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//expect 1 args : anchorUrl
	if len(args) != 1 {
		return shim.Error("Expected 1 argument, anchorUrl")
	}
	fmt.Printf("args %s\n", args[0])

	anchorURL := args[0]

	anchorAsBytes, err := stub.GetState(anchorURL)
	if err != nil {
		return shim.Error(err.Error())
	} else if anchorAsBytes == nil {
		return shim.Error("Anchor don't exist " + anchorURL)
	}

	//remove the anchor
	err = stub.DelState(anchorURL)

	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Println("Finished DeleteAnchor.")
	return shim.Success(nil)
}

// ============================================================
// getAnchor will fetch the anchor from the ledger. In case it doesn't exists, it will raise an error.
// ============================================================
func (t *AnchorChaincode) getAnchor(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//expect 1 args : anchorUrl
	if len(args) != 1 {
		return shim.Error("Expected 1 argument, anchorUrl")
	}
	fmt.Printf("args %s \n", args[0])

	anchorURL := args[0]

	anchorAsBytes, err := stub.GetState(anchorURL)
	if err != nil {
		return shim.Error(err.Error())
	} else if anchorAsBytes == nil {
		return shim.Error("Anchor don't exist " + anchorURL)
	}

	//unmarshall the stored value
	var anchorStored anchor
	json.Unmarshal(anchorAsBytes, &anchorStored)
	//get the anchor value and return as bytes
	anchorvalueAsBytes := []byte(anchorStored.AnchorValue)

	fmt.Println("Finished GetAnchor.")
	return shim.Success(anchorvalueAsBytes)

}
