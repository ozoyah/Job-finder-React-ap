import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMapMarker, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../assets/components/Spinner";
import { toast } from "react-toastify";

const JobPage = ({ deleteJob }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // delete button click event handler

  const onClickDelete = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this");

    if (!confirm) return;

    deleteJob(jobId);
    toast.success("Job deleted successfully");
    navigate("/jobs");
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      {job && (
        <>
          <section>
            <div className="container m-auto py-10 px-6">
              <Link
                className="  flex items-center text-purple-700 font-bold"
                to="/jobs"
              >
                <FaArrowLeft className="mr-2" /> Back to Job Listing
              </Link>
            </div>
          </section>
          <section className="bg-indigo-50">
            <div className="container m-auto py-10 px-6">
              <div className="container bg-white mb-8">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                  <div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                      <div className="text-gray-500 mb-4">{job.type}</div>
                      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                      <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                        <FaMapMarker className="fa-solid fa-location-dot text-lg text-red-700 mr-2" />
                        <p className="text-red-700">{job.location}</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-indigo-800 text-lg font-bold mb-6">
                        Job Description
                      </h3>

                      <p className="mb-4">{job.description}</p>

                      <h3 className="text-indigo-800 text-lg font-bold mb-2">
                        Salary
                      </h3>

                      <p className="mb-4">{job.salary}</p>
                    </div>
                  </div>

                  <aside>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-6">Company Info</h3>

                      <h2 className="text-2xl">{job.name}</h2>

                      <p className="my-2">{job.company.description}</p>

                      <hr className="my-4" />

                      <h3 className="text-xl">Contact Email:</h3>

                      <p className="my-2 bg-purple-100 p-2 font-bold shadow-lg">
                        {job.company.contactEmail}
                      </p>

                      <h3 className="text-xl">Contact Phone:</h3>

                      <p className="my-2 bg-purple-100 p-2 font-bold shadow-lg">
                        {job.company.contactPhone}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                      <Link
                        to={`/edit-job/${job.id}`}
                        className="bg-purple-500 hover:bg-purple-800 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                      >
                        Edit Job
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        onClick={() => onClickDelete(job.id)}
                      >
                        Delete Job
                      </button>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default JobPage;