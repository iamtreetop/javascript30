const getJob = async () => {
	const API_URL = `https://merchant.wish.com/api/v2/product/create-download-job`;
	const res = await axios.post(API_URL).catch((error) => {
		throw new Error("There was an error creating the job download", error)
	})
	return res?.data?.job_id;
};

const getDownload = async (jobId) => {
	const API_URL = `https://merchant.wish.com/api/v2/product/get-download-job-status`;
	let res = await axios.post(API_URL, {
		job_id: jobId,
	}).catch((error) => {
		throw new Error("There was an error geeting job ${jobId}", error)
	})
	
	if (res?.data?.status === "FINISHED") {
		return res?.data?.download_link;
	} 
	
	console.log("Download Unfinished. Try Again in couple of minutes")
};

getJob();