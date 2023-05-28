import { modalState } from '@/atoms/modalAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { Fragment, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';



function Modal() {


  const router = useRouter();

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)



  const [caption, setCaption] = useState('')
  const [image, setImage] = useState("")
  const [url, setUrl] = useState('')


  /* Adding Image To Post Modal */
  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (renderEvent) => {
      setSelectedFile(renderEvent.target.result);
    }
  }


  useEffect(() => {

    if (url) {
      /* saving post to mongodb */
      fetch("http://localhost:5000/createpost", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          caption,
          pic: url
        })
      })
        .then(res => res.json())
        .then((data) => {
          if(data.error) {
            notifyA(data.error)
          }
          else {
            notifyB('Successfully Posted :)')
            window.location.reload();
          }
        })
        .catch(err => console.log(err))
    }


  }, [url])



  /* posting image to cloudinary */
  const postDetails = () => {

    if (loading) return;

    setLoading(true);

    const data = new FormData();

    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "fantacloud")

    fetch("https://api.cloudinary.com/v1_1/fantacloud/image/upload", {
      method: 'post',
      body: data
    }).then((res) => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch((err) => console.log(err))

    setOpen(false);
    setLoading(false)
    setSelectedFile(null)

  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className=' fixed z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >

        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className=' hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >

            {/* Image and Caption Below */}
            <div className=' inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
      overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className=' w-full object-contain cursor-pointer'
                    onClick={() => setSelectedFile(null)}
                    alt=''
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className=' mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                  >
                    <CameraIcon
                      className=' h-6 w-6 text-red-600'
                      aria-hidden='true'
                    />
                  </div>
                )}



                <div>
                  <div className=' mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className=' text-lg leading-6 font-medium text-gray-900'
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        type='file'
                        hidden
                        onChange={(e) => {
                          addImageToPost(e)
                          setImage(e.target.files[0])
                        }}

                      />
                    </div>

                    <div className='mt-2'>
                      <input
                        value={caption}
                        onChange={(e) => {
                          setCaption(e.target.value)
                        }}
                        className=' border-none focus:ring-0 w-full text-center'
                        type='text'
                        placeholder='Please Enter a Caption...'
                      />
                    </div>

                  </div>
                </div>

                <div className=' mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectedFile}
                    className=' inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4
              py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 foucs:ring-red-500 sm:text-sm disabled:bg-gray-300
              disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                    onClick={() => { postDetails() }}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>


              </div>
            </div>

          </Transition.Child>

        </div>

      </Dialog>
    </Transition.Root>
  )
}

export default Modal