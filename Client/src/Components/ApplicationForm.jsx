import { useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react";
import { useToast } from "./toast"

export default function JobApplicationForm({ jobid }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
  });
   const { toast } = useToast()
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid contact number";
    }

    if (!formData.education.trim())
      newErrors.education = "Education details are required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience details are required";

    if (!file) newErrors.cv = "Please upload your CV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, cv: "Please upload a PDF file" }));
        setFile(null);
        e.target.value = "";
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          cv: "File size should be less than 5MB",
        }));
        setFile(null);
        e.target.value = "";
        return;
      }

      setFile(selectedFile);

      if (errors.cv) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.cv;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("education", formData.education);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("jobid", jobid);

      if (file) formDataToSend.append("cv", file);

      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to submit application");

      const result = await response.json();

      console.log("Application submitted successfully:", result);

      const verdictRes = await fetch("http://localhost:5000/api/getverdict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfUrl: result.resumeUrl,
          job: result.requiredFields,
        }),
      });

      if (!verdictRes.ok) throw new Error("Failed to get verdict");
      const verdictData = await verdictRes.json();
      console.log("Verdict data:", verdictData);
      if (verdictData.evaluation.matchLevel === "Not Qualified") {
       toast({
        title: "Failed to apply",
        message: "You do not meet the requirements for this job.",
        description: "Did you apply for the wrong job?",
        type: "error",
      });
        try {
          const response = await fetch(
            "http://localhost:5000/api/deleteApplication",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
               userID : result.userId,
               jobId  : jobid }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to delete application.");
          }

          const data = await response.json();
          // return data;
        } catch (error) {
          console.error("Error deleting job application:", error);
          throw error;
        }
        setSubmitStatus("error");
        return;
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/resumes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: result.userId,
              resume: verdictData.resume,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to save resume");
          }

          const data = await response.json();
          console.log("Resume saved:", data);

          setSubmitStatus("success");
          toast({
            title: "Application Submitted",
            message: "Your application has been submitted successfully!",
            description: "We will review your application and contact you soon.",
            type: "success",
          });
        } catch (error) {
          console.error("Error saving resume:", error);
          setSubmitStatus("error");
          alert("There was an error saving your resume. Please try again.");
        }
      }

      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        education: "",
        experience: "",
      });
      setFile(null);

      // Reset file input
      const fileInput = document.getElementById("cv");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] overflow-y-scroll px-4 py-6 sm:px-6 md:px-8">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          {submitStatus === "success" && (
            <div className="flex items-center gap-2 p-4 mb-6 bg-green-50 border border-green-200 text-green-800 rounded-md">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>
                Your application has been submitted successfully! We will
                contact you soon.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span>
                There was an error submitting your application. Please try
                again.
              </span>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-md outline-none transition-colors ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-green-500 focus:ring-2 focus:ring-green-200`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={`w-full px-3 py-2 border rounded-md outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-green-500 focus:ring-2 focus:ring-green-200`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
              className={`w-full px-3 py-2 border rounded-md outline-none transition-colors ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:border-green-500 focus:ring-2 focus:ring-green-200`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="education"
              className="block mb-2 font-medium text-gray-700"
            >
              Education/Qualification <span className="text-red-500">*</span>
            </label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Enter your educational qualifications"
              className={`w-full px-3 py-2 border rounded-md outline-none transition-colors min-h-[120px] resize-y ${
                errors.education ? "border-red-500" : "border-gray-300"
              } focus:border-green-500 focus:ring-2 focus:ring-green-200`}
            />
            {errors.education && (
              <p className="mt-1 text-sm text-red-500">{errors.education}</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="experience"
              className="block mb-2 font-medium text-gray-700"
            >
              Past Experiences <span className="text-red-500">*</span>
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Describe your past work experiences"
              className={`w-full px-3 py-2 border rounded-md outline-none transition-colors min-h-[150px] resize-y ${
                errors.experience ? "border-red-500" : "border-gray-300"
              } focus:border-green-500 focus:ring-2 focus:ring-green-200`}
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="cv"
              className="block mb-2 font-medium text-gray-700"
            >
              Upload CV (PDF) <span className="text-red-500">*</span>
            </label>
            <div>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-green-50 transition-colors ${
                  errors.cv ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => document.getElementById("cv").click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF (max. 5MB)</p>
                </div>
                <input
                  id="cv"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="flex items-center gap-2 p-2 mt-3 bg-gray-50 rounded border">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}

              {errors.cv && (
                <p className="mt-1 text-sm text-red-500">{errors.cv}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this application, you agree to our terms and
            conditions. Fields marked with{" "}
            <span className="text-red-500">*</span> are required.
          </p>
        </form>
      </div>
    </div>
  );
}
