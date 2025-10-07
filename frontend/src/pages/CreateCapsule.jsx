import React, { useState, useRef, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMicrophone, FaStop, FaSpinner } from "react-icons/fa";

const CreateCapsule = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [friends, setFriends] = useState([""]);
  const [openDate, setOpenDate] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({
    images: [],
    videos: [],
    voice: [],
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const getTomorrow = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  };

  const handleFileUpload = async (files, type) => {
    const token = await currentUser.getIdToken();
    const uploaded = [];

    setUploading((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files.map(() => true)],
    }));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/upload/single`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            timeout: 600000,
          }
        );
        uploaded.push(res.data.url);
      } catch (err) {
        console.error("Upload failed:", file.name, err);
        alert(`Failed to upload ${file.name}`);
      } finally {
        setUploading((prev) => {
          const arr = [...prev[type]];
          arr[i] = false;
          return { ...prev, [type]: arr };
        });
      }
    }

    if (type === "images") setImages((prev) => [...prev, ...uploaded]);
    if (type === "videos") setVideos((prev) => [...prev, ...uploaded]);
    if (type === "voice") setVoiceMessages((prev) => [...prev, ...uploaded]);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) =>
      audioChunksRef.current.push(event.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioFile = new File([audioBlob], "voice_message.wav", {
        type: "audio/wav",
      });
      await handleFileUpload([audioFile], "voice");
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleFriendChange = (index, value) => {
    const newFriends = [...friends];
    newFriends[index] = value;
    setFriends(newFriends);
  };
  const addFriendField = () => setFriends([...friends, ""]);
  const removeFriendField = (index) =>
    setFriends(friends.filter((_, i) => i !== index));

  const removeItem = (type, index) => {
    if (type === "images") setImages(images.filter((_, i) => i !== index));
    if (type === "videos") setVideos(videos.filter((_, i) => i !== index));
    if (type === "voice")
      setVoiceMessages(voiceMessages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await currentUser.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/capsule`,
        {
          title,
          text,
          media: { images, videos, voiceMessages },
          openDate,
          friends: friends.map((email) => ({ email })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create capsule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const anyUploading =
    uploading.images.includes(true) ||
    uploading.videos.includes(true) ||
    uploading.voice.includes(true);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-black via-[#001133] to-black text-white py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-orbitron text-hero mb-8 text-center">
            Create a New Capsule
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 space-y-6"
          >
            <label className="block text-hero font-orbitron mb-2">
              Capsule Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter capsule title"
              className="w-full p-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-hero outline-none font-orbitron"
              required
            />

            <label className="block text-hero font-orbitron mb-2">
              Description
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a brief description..."
              className="w-full p-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-hero outline-none font-orbitron"
              rows={4}
            />

            <label className="block text-hero font-orbitron mb-2">
              Invite Friends
            </label>
            {friends.map((email, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleFriendChange(i, e.target.value)}
                  placeholder="friend@example.com"
                  className="flex-1 p-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-hero outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFriendField(i)}
                  className="text-red-500 hover:text-red-400"
                  aria-label="Remove friend"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFriendField}
              className="text-sm text-hero hover:underline"
            >
              + Add another friend
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-hero font-orbitron mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleFileUpload([...e.target.files], "images")
                  }
                  className="block w-full text-white"
                />
                <div className="flex flex-wrap gap-2 mt-2 bg-hero/10 p-2 rounded-xl">
                  {images.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded-lg border border-white/10"
                      />
                      {uploading.images[index] && (
                        <div className="absolute inset-0 bg-hero/40 flex items-center justify-center rounded-lg">
                          <FaSpinner className="animate-spin text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem("images", index)}
                        className="absolute top-0 right-0 text-red-400 bg-black/70 p-1 rounded-full"
                        aria-label="Remove image"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-hero font-orbitron mb-2">
                  Upload Videos
                </label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) =>
                    handleFileUpload([...e.target.files], "videos")
                  }
                  className="block w-full text-white"
                />
                <div className="flex flex-wrap gap-2 mt-2 bg-hero/10 p-2 rounded-xl">
                  {videos.map((url, index) => (
                    <div key={index} className="relative">
                      <video
                        src={url}
                        className="w-24 h-20 object-cover rounded-lg border border-white/10"
                        controls
                      />
                      {uploading.videos[index] && (
                        <div className="absolute inset-0 bg-hero/40 flex items-center justify-center rounded-lg">
                          <FaSpinner className="animate-spin text-white" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem("videos", index)}
                        className="absolute top-0 right-0 text-red-400 bg-black/70 p-1 rounded-full"
                        aria-label="Remove video"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-hero font-orbitron mb-2">
                Voice Messages
              </label>
              <div className="flex items-center gap-4 mb-3">
                {!recording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="bg-hero text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition"
                  >
                    <FaMicrophone /> Record
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition"
                  >
                    <FaStop /> Stop
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 bg-hero/10 p-2 rounded-xl">
                {voiceMessages.map((url, index) => (
                  <div key={index} className="relative">
                    <audio controls src={url}></audio>
                    {uploading.voice[index] && (
                      <div className="absolute inset-0 bg-hero/40 flex items-center justify-center rounded-lg">
                        <FaSpinner className="animate-spin text-white" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeItem("voice", index)}
                      className="absolute top-0 right-0 text-red-400 bg-black/70 p-1 rounded-full"
                      aria-label="Remove voice message"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <label className="block text-hero font-orbitron mb-2">
              Capsule Open Date
            </label>
            <input
              type="date"
              min={getTomorrow()}
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
              className="w-full p-3 bg-hero border border-white/20 rounded-lg text-black focus:border-hero outline-none"
              required
            />

            <div className="text-center">
              <button
                type="submit"
                disabled={loading || anyUploading}
                className="bg-hero text-black px-8 py-3 rounded-lg font-semibold hover:opacity-80 transition inline-flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Capsule"
                )}
              </button>
            </div>
          </form>
        </div>

        {(anyUploading || loading) && (
          <div className="fixed inset-0 backdrop-blur-lg flex flex-col items-center justify-center z-50 text-white">
            <FaSpinner className="animate-spin text-6xl mb-4 text-hero drop-shadow-lg" />
            <p className="text-xl font-orbitron tracking-widest">
              {loading
                ? "Creating capsule..."
                : "Uploading files... Please wait"}
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CreateCapsule;
