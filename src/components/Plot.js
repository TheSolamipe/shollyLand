import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

// Import Assets
import Grass from "../assets/grass.jpeg";
import Grass2 from "../assets/grass2.jpeg";

const Plot = ({
  position,
  size,
  landId,
  landInfo,
  setLandName,
  setLandOwner,
  setLandId,
  setHasOwner,
}) => {
  const [surface, color] = useLoader(TextureLoader, [Grass, Grass2]);
  const clickHandler = () => {
    setLandName(landInfo.name);
    setLandId(landId);
    console.log(landInfo);
    if (landInfo.owner === "0x0000000000000000000000000000000000000000") {
      setLandOwner("No owner");
      setHasOwner(false);
    } else {
      setLandOwner(landInfo.owner);
      setHasOwner(true);
    }
  };

  return (
    <mesh position={position} onClick={clickHandler}>
      <planeBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial map={color} normalMap={surface} metalness={0.25} />
    </mesh>
  );
};

export default Plot;
