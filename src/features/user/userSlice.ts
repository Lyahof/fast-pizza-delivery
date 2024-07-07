import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

interface UserState {
	username: string;
	status: 'idle' | 'loading' | 'error';
	position: {} ;
	address: string;
	error: string | null;
}

interface GetAddressProps {
	latitude: number;
	longitude: number;
}

const initialState: UserState = {
	username: '',
	status: 'idle',
	position: {},
	address: '',
	error: null
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
	'user/fetchAddress',
	async function() {
		const positionObj = await getPosition();
		const position: GetAddressProps = {
		  latitude: positionObj.coords.latitude,
		  longitude: positionObj.coords.longitude,
		};
	 
		const addressObj = await getAddress(position);
		const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
	 
		return { position, address };
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateName(state, action: PayloadAction<string>) {
			state.username = action.payload
		}
	},
	extraReducers: (builder) => 
		builder
			.addCase(fetchAddress.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAddress.fulfilled, (state, action) => {
				state.position = action.payload.position;
				state.address = action.payload.address;
				state.status = 'idle';
			})
			.addCase(fetchAddress.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message || '';
			})
})

export const {updateName} = userSlice.actions;
export const getUser = (state: { user: UserState }) => state.user.username;

export default userSlice.reducer;