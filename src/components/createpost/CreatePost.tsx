import React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Input from "../Input";

type CreatePostProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
  onClose: () => void;
};

function CreatePost({ open, setOpen, refresh, onClose }: CreatePostProps) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/post/create.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 201 && data.success) {
      setOpen(false);
      formRef.current?.reset();
      refresh();
    }
  };

  const close = () => {
    formRef.current?.reset();
    setOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed ${
        !open && "translate-y-full"
      } transition-transform z-50 px-6 py-4 bg-white w-3/4 shadow-xl border border-gray-100 left-1/2 bottom-0 -translate-x-1/2 `}
    >
      <div className="h-[calc(100vh-12rem)]">
        <div className="flex justify-between flex-wrap">
          <div className="text-2xl font-bold w-full">Create Post</div>
          <AiOutlineCloseSquare
            className="text-4xl font-bold fixed top-4 right-4"
            onClick={close}
          />

          <div className="spacer h-20"></div>

          <form onSubmit={handleSubmit} ref={formRef}>
            <Input
              label="Image"
              placeholder="Enter image url"
              type="text"
              name="image"
              id="image"
              maxLength={255}
            />

            <div className="spacer h-2 w-full"></div>

            <Input
              label="Description"
              placeholder="Enter description"
              type="text"
              name="description"
              id="description"
            />

            <div className="spacer h-2 w-full"></div>

            <div>
              <input
                type="submit"
                name="submit"
                value={"Create Post"}
                id="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition hover:shadow-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
