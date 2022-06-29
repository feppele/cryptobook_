/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import logo from '../../images/logo.png'
import profilColor from '../../images/background.jpeg';
import {getProfilePicURL} from '../../node/images'
import {getCurrentUser} from '../../web3/HelperFunctions'

import Wallet from '../wallet/Wallet'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar2() {
      
  const [walletOpen,setWalletOpen] =useState(false)

  function closeWallet(){
    setWalletOpen(false)
  }

  function openWallet(){
    setWalletOpen(true)
  }

      const navigation = [
        { name: 'Friends', onclick: openFriends, current: false },
        { name: 'Wallet', onclick: openWallet, current: false },
        { name: 'My NFTs', onclick: openMyNftPage, current: false },
        { name: 'NFT-Marketplace', onclick: openMarketplace, current: false },
      ]

        //my Code

        const history = useHistory();


        const [profilePic,setProfilePic] = useState(profilColor);


        function openHome(){
          closeWallet()
          history.push("/home");
        }
        // for change Path
        function openProfil(){
            if(!window.ethereum){ history.push("/")}else{
                history.push("/me");
                closeWallet()
            }
        }

        function openFriends(){
            if(!window.ethereum){ history.push("/")}else{
                history.push("/friends")
                closeWallet()
            }
        }
        function openMyNftPage(){
            if(!window.ethereum){ history.push("/")}else{
                history.push("/mynft");
                closeWallet()
            }
        }

        function openMarketplace(){
            history.push("/marketplace");
            closeWallet()
        }

        function logOut(){
            history.push("/");
            closeWallet()
        }

        //load ProfilePic
        useEffect(() => {
            getCurrentUser().then(address=>{
                getProfilePicURL(address).then(url => {
                    if(url.length >0){
                        setProfilePic(url);
                    }
                })
            })

        },[])

        //my Code ^^

  return (



    <div style={{width: '100%', background: 'black',position: 'sticky',top:0,margin: '0px',zIndex:'2000'}} >


    {walletOpen && <Wallet closeWalletFunc={closeWallet}/> }


    <Disclosure as="nav" className="bg-black-800"  style={{zIndex:'3000'}}>
      {({ open }) => (
        <>
          <div className="max-w-10xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    style={{cursor:'pointer'}}
                    onClick={openHome}
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                  <img
                  style={{cursor:'pointer'}}
                    onClick={openHome}
                    className="hidden lg:block h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                <div style={{zIndex:'2000'}} className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        style={{cursor:'pointer'}}
                        key={item.name}
                        href={item.href}
                        onClick={item.onclick}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full  ring-2 ring-offset-2 ring-offset-gray-800 ring-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-14 w-14 rounded-full"
                        src={profilePic}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items style={{zIndex:'2000'}}className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a style={{cursor:'pointer'}}
                            onClick={openProfil}
                            
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-2 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  )
}
