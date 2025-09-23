"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DarkPanel from "../DarkPanel";
import SectionTitle from "../SectionTitle";
const markerSize = 16;
// Custom icon using your brand color
const customIcon = new L.Icon({
  iconUrl:
    "https://www.flaticon.com/download/icon/8206348?icon_id=8206348&author=2467&team=2661&keyword=Round&pack=8206302&style=Flat+Gradient&style_id=1279&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard&token=03AFcWeA5h3L4bYfWqjvnflwWUz6KpNX59bh02n-2lQAT0dpmZWBbWS6AuWL63XxkHlM080pRbH0ScB7ZB16Qc0zYO1ASW0Rzj7DYbouGn7DNKVcHxTY-dAZ1ux2SHTBSHzY2kndVPK-am5AQgA7iNScrZLUR7oiimbbu-QZT03v6wsxCoAjgR-tPVCq55NrLXrIvQd6eVasQmAFlCkpwfrShYTag1PycH8TTYkXQxaXBRghnryVWb-wrpneZ44q-JsL6s2qxk3gdFCytKOwihXkgjALUtX_FhcBvu7eKCckB5MX_QxF-Z6qeGXIIVzHssKLG1epUUTdWtcc-B529XS9_y1oi_E84KfJxkDkzIcQCEoci04okPHU2DXqeyUfvlN85gJw4QwieIzTu1qtMbJwZLsc5Viw49Uoz-V8UHSR1PmgOM8Sm4IvNH3fFv5hf6v5PNxrRmfKFAEz15PZY5wmnTUXuWQyY_LwNyyFjXsvIxkCMfSm9lwqqEk7p8g3k1P0hHvfOSZIPwbdCCFyXVJ1BIgOmlEmJpLWlC3BpoMbyJJ9ydTCpDZNp2Sw2PI7XS1bvrf6_0jbtp1cr6f6Q-eC8Kjy292LNtlN7sO-iOO_71ojYc8xC4pL5W1vNY07WIIsEwgc67RqAcpxDmOUc2bxFPzceZsO9Y0OSeGwsdloFnJoTdAmNCXv2r54mKmGld8oF7TqMRymUbtr0TfF7TH5dDo3PhhiKVJrcRN0417-T-6eQt8MNXlDAagrMMy0lhq-jL2Iay9wNar0K-kJXhoReDXCpwFMHxRlnpS8BO7NdqpSsji8B7p4O-u14bFvi47OrFXwhZerNRnUgH8RDv1tGOHMUBrjdxAXV-UKmt6eVZsv7tjHuYb3p9yt1gWgG9ktbYZzeoAl3gpcnIslE23KTjaw59o_aEZADlMeWnowshx_j5w0wpcEgsLREi3tvw1DxnNN_MVKix-i2hQHxt1FkFfFsF9fzPWmxuLnJoWIzDG6H9EfN_ht9Bdz4-qqwVSTnlFCaCsfpoJ7sa89g_ULCPxv2gLEgnLTY7lsmo1DQRSUGnpJPtHEgSNgkhLGjoMqXIDuCzXhl3skt4Zh4Km6dMX4Zx2YIxu6l8eaJXFH_d_sp1XeSdcck9Lsaw0QxxmAlevaFA-7sxSZ0k0KxIVMRhypAh1TxvORi-gf9CoEGqT8D-bTpYz-jpwQ-VS0NfSESAmBSBWJxb_q08Ly0VL4NmBT25a-b8kSvXPXe4mfgvueQZXLYFbaTxNPBHndQHdskreoaB3zPRz837Y92bEsSe8uZQj7UrtIZy_HnYsRgGxMkmYZqV8ZgUSP16YOUP1yF31-5ZlPMAYSeJ2y_KQMaAm9NaI2lqpc6XueZfgoM76lIGT3xb-eSbo6sg0je0ahG6AewPulng9Ie8bnI6pnl5BrtoofVL2QDDF4K-iMQ62QROBufPhEw5rg92RZWk-7mqeeOTsmg7xPI1NPeAyFyHLEUi6M-FTA4YQlsEpIQBBOrO9PWx03BMptFNVr5Lot8wRWZ2KmZQgZanwzI8Xtw462S6OxtDOf3dNkMD0OyqAH61sVk2xNp7nvziPxGvG4fieq__00FbadAbckDu5JaXLA0R7xmYg6xNzd4LeyLYJAXs-ucgirXlNSidWo7x0aEY1S69prXqoDSQNBjJ0xIVdiiqibp9Bz89XqIEp9RA7ZOmhmiRITTIKJp-4S4UASOzbdOqL-dptwbrzO6e5yQH8N0FP5RC_p_pgIy0SpikYDlmUbT10If_VPu85vRCZNRoK-3YTnxjpiVOYw75IE-S19aFi9RMbMv2uvnF0T3MPdmildX1zcv18Bbj68FfOhmXkDtdrnKb77Jh2RWnF13ynYJEtDmVci9lOXuV3H69egVuTrPwxl80GaoQ4cEAYtDO6R-pPQze-dFZZHOHdBeEP9xqrudgI2j7xJW2ncKyjrPfxijimjdruUFPCg6nCcGqnKl7O-5z8TNN99NN_kuAr71J9DLZGhdqjaGxhBhb3hxr2baRC1TnMrkSaVMn8Nh0fRvmQwMzQE8gT7WAskBzmVJunMRkOOY-i1kHWhmQi5HS83jCZfb9PuwRq4xMdoZ6puJCUbREl1jfAW0tN1P56cFrFvFCrLyRTNuqHcLlMMh-Wxn1B-E&search=circle", // Placeholder
  iconSize: [markerSize, markerSize],
  iconAnchor: [markerSize / 2, markerSize],
  popupAnchor: [0, -markerSize],
  className: "leaflet-marker-icon",
});
interface PharmacyLocation {
  name: string;
  position: number[];
}
const pharmacies: PharmacyLocation[] = [];

export default function OurLocations() {
  return pharmacies.length === 0 ? null : (
    <DarkPanel>
      <SectionTitle title="Our" titleContinued="Locations" description="" />
      <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-md border">
        <MapContainer
          center={[28.3949, 84.124]}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {pharmacies.map((pharmacy, idx) => (
            <Marker
              key={idx}
              position={{
                lat: pharmacy.position[0],
                lng: pharmacy.position[1],
              }}
              icon={customIcon}
            >
              <Popup>
                <span className="font-semibold text-[#3B368C]">
                  {pharmacy.name}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </DarkPanel>
  );
}
