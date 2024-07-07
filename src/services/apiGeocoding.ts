interface GetAddressProps {
	latitude: number;
	longitude: number;
}

export async function getAddress({ latitude, longitude }: GetAddressProps) {
	try {
		const res = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
		);
		if (!res.ok) throw new Error("Failed getting address");
	
	  const data = await res.json();
	  return data;
	} catch(err) {
			console.error('Error fetching geolocation position');
			throw new Error('Error fetching geolocation position');
	}
}
