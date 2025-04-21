export async function fetchIp (): Promise < string >
{
  const respond = await fetch ( 'https://api.ipify.org?format=json' );
  const data = await respond.json ();
  let ip: string = "1.163.68.121" //data.ip;

  return ip;
}
