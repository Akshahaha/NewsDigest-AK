import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: "gpnvxgupofsarlmftbdf", // e.g., 'xyz123'
  region: "ap-south-1", // e.g., 'eu-central-1'
});

export default nhost;