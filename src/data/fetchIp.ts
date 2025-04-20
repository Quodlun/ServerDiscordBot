export async function fetchIp (): Promise < string >
{
  const respond = await fetch ( 'https://api.ipify.org?format=json' );
  const data = await respond.json ();
  return data.ip;
}
