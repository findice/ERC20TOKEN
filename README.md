# ERC20TOKEN
https://blog.zeppelinos.org/smart-contract-upgradeability-using-eternal-storage/
 
 

# structure
 
               -------             =========================
              | Proxy |           ║  UpgradeabilityStorage  ║
               -------             =========================
                  ↑                 ↑                     ↑            
                 ---------------------              -------------
                | UpgradeabilityProxy |            | Upgradeable |
                 ---------------------              ------------- 
                                                      ↑        ↑
                                              ----------      ---------- 
                                             | Token_V1 |  ← | Token_V2 |         
                                              ----------      ---------- 
                                              
                                              
                                              
## How to upgrade


### How to initialize

#### 1.Deploy Registry contract
#### 2.Deploy the initial version of the  contract (V1) and ensure that it inherits the Upgradeable contract
#### 3.Register the address of this initial version (V1) with the Registry contract
#### 4.Require the Registry contract to create an instance of UpgradeabilityProxy
#### 5.Call your UpgrageabilityProxy instance to upgrade to your original version (V1)


### How to upgrade
#### 1.Deploy a new version (V2) that inherits your original version of the contract
#### 2.Register a new version of the contract V2 with the Registry
#### 3.Call your UpgradeabilityProxy instance to upgrade to the latest registered version

## Attention
### 
