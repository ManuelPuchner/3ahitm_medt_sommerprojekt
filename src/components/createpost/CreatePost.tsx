import React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Input from "../Input";
import { useAuth } from "../../hooks/OwnAuth";

type CreatePostProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
  onClose: () => void;
};

function CreatePost({ open, setOpen, refresh, onClose }: CreatePostProps) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [uploadedImagePath, setUploadedImagePath] = React.useState<
    string | null
  >(null);
  const { isTeacher: isTeacherMethod, isLoggedIn } = useAuth();
  const [isTeacher, setIsTeacher] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      isTeacherMethod().then((res) => {
        setIsTeacher(res);        
      });
    }
  }, [isLoggedIn, isTeacherMethod]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    if (uploadedImagePath === null || uploadedImagePath === "") {
      return;
    }

    formData.append("image", uploadedImagePath);
    formData.append("description", form.description.value);

    if(isTeacher) {
      formData.append("important", form.important.checked);
    }
    
    const body = JSON.stringify(Object.fromEntries(formData));

    console.log(body);
    

    const response = await fetch("/api/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body
    });

    const data = await response.json();

    console.log(data);

    if (response.status === 201 && data.success) {
      setOpen(false);
      formRef.current?.reset();
      refresh();
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("fileToUpload", e.target.files[0]);

    const res = await fetch("/api/image/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setUploadedImagePath(data.data);
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
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={uploadImage}
              className={
                uploadedImagePath === null || uploadedImagePath === ""
                  ? "border border-red-500"
                  : "border border-gray-100"
              }
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

            {isTeacher && (
              <Input
                label="Important"
                type="checkbox"
                name="important"
                id="important"
              />
            )}

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
