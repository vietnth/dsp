import { Dimensions } from "react-native";

const config = {
	SERVER_URL: "https://toanha.dsp.vn/",
	DSP_URL: "https://dsp.vn/",
	TEST_URL: "https://api.ice5.skyx.app/",
	Tac_pham_URL: "https://chammuseum.dsp.vn/api.aspx/getlistanpham",
	LoginUrl:"https://toanha.dsp.vn/api.aspx?type=Dangnhap",
	DEVELOP_MODE: true
}

export function getTacphamURL() {
	return Tac_pham_URL
}

export function getBaseURL() {
	if (AppConfig.DEVELOP_MODE) {
		return AppConfig.TEST_URL
	}
	return AppConfig.SERVER_URL
}

export function getImageURL(filename) {
	return getBaseURL() + "public/data/language/" + filename;
}

export default AppConfig = config;