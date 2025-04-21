export async function fetchIp (): Promise < string >
{
  const respond = await fetch ( 'https://api.ipify.org?format=json' );
  const data = await respond.json ();
  let ip: string = data.ip;

  return ip;
}
