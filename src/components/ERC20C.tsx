"use client"


import Tool from "./Tool";
import {useRecoilState} from "recoil"
import { ERC20CAccessControl, ERC20CAccessControlOwnable, ERC20CAccessControlRoles, ERC20CBurnable, ERC20CLicense, ERC20CMintable, ERC20CName, ERC20CPauseable, ERC20CPremint, ERC20CSymbol, ERC20CUpgradeable } from "@/store/ERC20C";
import checkIfNumber from "@/lib/checkIfNumber";





const ERC20 = ()=>{
   
    const [name, setName] = useRecoilState(ERC20CName);
    const [license, setLicense] = useRecoilState(ERC20CLicense);
    const [symbol, setSymbol] = useRecoilState(ERC20CSymbol);
    const [premint, setPremint] = useRecoilState(ERC20CPremint);
    const [mintable, setMintable] = useRecoilState(ERC20CMintable);
   
    const [pauseable, setPauseable] = useRecoilState(ERC20CPauseable);
    const [accessControl, setAccessControl] = useRecoilState(ERC20CAccessControl);
    const [burnable, setBurnable] = useRecoilState(ERC20CBurnable);   
    const [upgradeable, setUpgradeable] = useRecoilState(ERC20CUpgradeable);
    const [roles, setRoles] = useRecoilState(ERC20CAccessControlRoles);
    const [ownable, setOwnable] = useRecoilState(ERC20CAccessControlOwnable);
    


    
      const handleAccessControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        
        if (value === 'ownable') {
            setOwnable(true);
            setRoles(false);
            
        } else if (value === 'roles') {
            setRoles(true);
            setOwnable(false);

        } 
        
        // If either Burnable or Pauseable is true, set Access Control to true
    
        if (isChecked || mintable || pauseable || upgradeable) {
            setAccessControl(true);
            
        } else {
            setAccessControl(false);
        }
        
    };
    
    const handleMintableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMintable(!mintable);
        const isChecked = e.target.checked;
        
    
        // If Mintable is true, set Access Control to true
        if (isChecked) {
            if(!accessControl){
            setAccessControl(true);
            setOwnable(true)
            }
        } else {
            // If both Burnable and Pauseable are false, set Access Control to false
            if (!pauseable && !upgradeable) {
                setAccessControl(false);
                setOwnable(false)
                setRoles(false)
            }
        }
    };
    
    const handlePauseableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPauseable(!pauseable);
        const isChecked = e.target.checked;
        
        // If Pauseable is true, set Access Control to true
        if (isChecked) {
            if(!accessControl){
            setAccessControl(true);
            setOwnable(true)
            }
        } else {
            // If both Burnable and Pauseable are false, set Access Control to false
            if (!mintable && !upgradeable) {
                setAccessControl(false);
                setOwnable(false)
                setRoles(false)
            }
        }
    };

    const handleUpgradeable = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpgradeable(!upgradeable);
        const isChecked = e.target.checked;
        
        // If Pauseable is true, set Access Control to true
        if (isChecked) {
            if(!accessControl){
            setAccessControl(true);
            setOwnable(true)
            }
        } else {
            // If both Burnable and Pauseable are false, set Access Control to false
            if (!mintable && !pauseable) {
                setAccessControl(false);
                setOwnable(false)
                setRoles(false)
            }
        }
    };

    const handlePremintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value == ''){
            setPremint(value);
        }
        else{
            if (checkIfNumber(value, true)) {
                setPremint(value);
            }
        }    
      };
      

    

      const handleAccessControl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (!mintable && !pauseable && !upgradeable) {
        
            if (value === 'access') {
            
            if (isChecked) {
                setOwnable(true);
                setRoles(false);
    
            } else {
                setOwnable(false);
                setRoles(false);
                
            }
            setAccessControl(!accessControl);
            }
        }else {
            // If either Mintable or Pauseable is true, prevent the change in Access Control
            e.preventDefault();
        }
      };
     
      


    return(
        <div className="p-4 overflow-visible">
        <div>
          <h1 className="text-white font-semibold text-xs">SETTINGS</h1>
          <div className="flex flex-row">
            <div className="flex flex-col w-[60%] p-[0.5rem]">
                    <label htmlFor="name" className="text-white  text-black">
                        Name
                    </label>
                    <input  id="name" type="text" placeholder="MyToken" className="border border-1 border-[#818998] bg-transparent rounded-[6px] p-1" value={name}  onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="flex flex-col w-[40%] p-[0.5rem]">
                    <label htmlFor="symbol" className="text-white text-[0.875rem]">
                        Symbol
                    </label>
                    <input  id="symbol" type="text" placeholder="MTK" className="border border-1 border-[#818998] bg-transparent rounded-[6px] p-1" value={symbol}  onChange={(e) => setSymbol(e.target.value)}/>
            </div>
          </div>
            <div className="flex flex-col p-[0.5rem]">
                <div className="flex item-center place-content-between">
                    <label htmlFor="uri" className="text-white text-[0.875rem]">
                        Premint
                    </label>
                    <Tool tooltipText="Create an initial amount of tokens for the deployer." />
                </div>
                <input  id="uri" type="text" placeholder="0" className="border border-1 border-[#818998] rounded-[6px] p-1  bg-transparent" value={premint}  onChange={ handlePremintChange}/>
            </div>
        </div>
  
        <hr className="my-4"></hr>
  
        <div>  
          <h1 className="text-white font-semibold text-xs">FEATURES</h1>
        <div className="mt-2">
          <label className={`flex items-center justify-between cursor-pointer ${mintable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Mintable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={mintable}
                onChange={handleMintableChange}
              />
              <span className="ml-[0.5rem] text-white select-text">Mintable</span>
            </div>
            <Tool tooltipText="Privileged accounts will be able to create more supply." />
          </label>
  
          <label className={`flex items-center justify-between cursor-pointer ${burnable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Burnable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={burnable}
                onChange={() => setBurnable(!burnable)}
              />
              <span className="ml-[0.5rem] text-white select-text">Burnable</span>
            </div>
            <Tool tooltipText="Token holders will be able to destroy their tokens." link='https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20Burnable' linktext='Read more'/>
          </label>
  
          <label className={`flex items-center justify-between cursor-pointer ${pauseable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Pauseable"
                type="checkbox"
                className="form-checkbox h-3 w-3 text-indigo-600 rounded"
                checked={pauseable}
                onChange={handlePauseableChange}
              />
              <span className="ml-[0.5rem] text-white select-text">Pauseable</span>
            </div>
            <Tool tooltipText="Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response." link='https://docs.openzeppelin.com/contracts/5.x/api/utils#Pausable' linktext='Read more'/>
          </label>
  
          
  
          <label className={`flex items-center justify-between cursor-pointer ${upgradeable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Updateable URI"
                type="checkbox"
                className={`form-checkbox h-3 w-3 text-indigo-600 rounded `}
                checked={upgradeable}
                onChange={handleUpgradeable}
              />
              <span className="ml-[0.5rem] text-white select-text">Upgradeable</span>
            </div>
            <Tool tooltipText="Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction." link='https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20FlashMint' linktext='Read more'/>
          </label>          
          </div>
        </div>
  
        <hr className="my-4"></hr>
  
        <div>
          <div className=" mt-0  flex items-center place-content-between">
            <div className="flex items-center mr-[0.5rem]">
              <label className="text-white font-semibold text-xs mr-[0.5rem]">ACCESS CONTROL</label>
              <input
              title="Add owner to contract"
                type="checkbox"
                className={`form-checkbox h-3 w-3 rounded ${accessControl && (pauseable || mintable || upgradeable) ? "accent-grey-300 hover:accent-grey-300" : ""}`}
                checked={accessControl}
                value="access"
                onChange={handleAccessControl}
              />
            </div>
            <Tool tooltipText="Restrict who can access the functions of a contract or when they can do it." link='https://docs.openzeppelin.com/contracts/5.x/api/access' linktext='Read more' />
          </div>
  
        <div className="mt-2">
          <label className={`flex items-center justify-between cursor-pointer ${ownable ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Ownable"
                type="radio"
                name="accessControl"
                className="form-radio h-3 w-3"
                value="ownable"
                checked={ownable}
                onChange={handleAccessControlChange}
              />
              <span className="ml-2 text-white select-text">Ownable</span>
            </div>
            <Tool tooltipText="Simple mechanism with a single account authorized for all privileged actions." link='https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable' linktext='Read more'/>
          </label>
  
          <label className={`flex items-center justify-between cursor-pointer ${roles ? 'bg-[#4D3C77]' : ''}`}>
            <div className="m-[0.5rem] flex items-center">
              <input
                title="Roles"
                type="radio"
                className="form-radio h-3 w-3"
                value="roles"
                name="accessControl"
                checked={roles}
                onChange={handleAccessControlChange}
              />
              <span className="ml-2 text-white select-text">Roles</span>
            </div>
            <Tool tooltipText="Flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts." link='https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl' linktext='Read more'/>
          </label>
  
          
        </div>
      </div>
  
        <hr className="my-4" />
  
         
        <div className="px-2">
          <h1 className="text-white font-semibold text-xs ">INFO</h1>
          
          <div className="flex flex-col mt-[0.75rem]">
            <label htmlFor="license" className="text-white text-sm"> License </label>
            <input
              id="license"
              type="text"
              placeholder="MIT"
              className="border border-1 border-[#818998] rounded-[6px] p-1 bg-transparent"
              value={license} onChange={(e) => setLicense(e.target.value)}
            />
          </div>
        </div>
      </div>  
    )
}

export default ERC20;