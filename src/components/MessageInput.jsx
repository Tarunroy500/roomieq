import { useRef, useState } from "react";
import { Image, Loader, Send, X } from "lucide-react";
import { useChatStore } from "../../utils/useChatStore";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length + imagePreviews.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const readers = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setImagePreviews((prev) => [...prev, ...results]);
    });
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && imagePreviews.length === 0) return;
    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        images: imagePreviews,
      });

      // Clear form
      setText("");
      setImagePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreviews.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            disabled={isSending}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={isSending}
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            disabled={isSending}
            className="flex btn btn-sm md:btn-md btn-circle text-zinc-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm md:btn-md btn-circle"
          disabled={isSending || (!text.trim() && imagePreviews.length === 0)}
        >
          {!isSending ? <Send size={22} /> : <Loader size={22} className="animate-spin" />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
