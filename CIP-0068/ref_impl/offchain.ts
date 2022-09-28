// Lucid off-chain code: Mint an 222 NFT according to CIP-0068 standard
import {
  Blockfrost,
  Constr,
  Data,
  Lucid,
  MintingPolicy,
  PlutusData,
  SpendingValidator,
  TxHash,
  utf8ToHex,
} from "https://deno.land/x/lucid@0.6.5/mod.ts";

const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    "<project_id>",
  ),
  "Preview",
);

lucid.selectWalletFromSeed(
  "<seed_phrase>",
);

type FilesDetails = {
  name?: string;
  mediaType: string;
  src: string;
};

type Metadata = {
  name: string;
  image: string;
  mediaType?: string;
  description?: string;
  files?: FilesDetails[];
  [key: string]: unknown;
};

// onchain.hs: mintingPolicy
const mintingPolicy: MintingPolicy = {
  type: "PlutusV2",
  script:
    "590e19590e160100003332323233223322323232323232323232323232323232323232323232323233223232323232323232323232323232332232323222232232325335332232323232323232533500913323355001350375035235001222333573466e2000520000430423018120013031301b5007133035323232350032222222222223335530271200135025502825335333573466e3c03cd400488d4008880081381344ccd5cd19b8700e3500122350022200104e04d104d00c35011220013501022002500733035323233355301a120013503850362350012233355301d120013503b50392350012233350012330264800000488cc09c0080048cc0980052000001330130020013232323350433355045003335043335504500200150445044500850065004323233553019120012350012233550460023355301c1200123500122335504900233350012330434800000488cc1100080048cc10c0052000001330130020013233553019120012350012233550460023355301c1200123500122335504900233704900080080080099a82019aa82102199a82019aa821021981e000a820a8209aa99a99199aa980a0900091299a9a8011111299a9a80b911a803111919a802919a8021299a999ab9a3371e0040020980962a00620964096466a00840964a66a666ae68cdc78010008260258a80188258a99a80190a99a8011099a801119a801119a801119a8011198158010009027119a801102711981580100091102711119a8021027111299a999ab9a3370e00c0060a20a02a66a666ae68cdc38028010288280998180020008828082808248a99a80090824882489a81619aa8240010018a8159099a8218008010800a8209a80091111111111100528038b1109a80111299a8018891800801110b10009981a9980e9aa803111111002240046606a6603aa00a90011981a9980d1aa80311111100328009981a9980d2801a8009981a9980d1980e01ca80124505283232322900330353301a3301c03950044881052831303029003301a33038039500233038039500413500722333350012326320313357389201024c680003120012326320313357389201024c68000312326320313357389201024c6800031135500422222200513550032222220031355002222222002135500122222200115335302b3015500116221350022225335004162213500222253350041123333330010090080070040030022216135001220023333573466e1d40112002212200223333573466e1d40152000212200123263202833573805205004c04a6666ae68cdc39aab9d5002480008cc8848cc00400c008c8c8c8c8c8c8c8c8c8c8c8c8c8cccd5cd19b8735573aa018900011999999999999111111111110919999999999980080680600580500480400380300280200180119a8120129aba1500c33502402535742a01666a04804c6ae854028ccd540a1d728139aba150093335502875ca04e6ae854020cd40900bcd5d0a803999aa8140183ad35742a00c6464646666ae68cdc39aab9d5002480008cc8848cc00400c008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a81d3ad35742a00460766ae84d5d1280111931901e99ab9c03e03d03b135573ca00226ea8004d5d0a8011919191999ab9a3370e6aae754009200023322123300100300233503a75a6ae854008c0ecd5d09aba2500223263203d33573807c07a07626aae7940044dd50009aba135744a004464c6407266ae700e80e40dc4d55cf280089baa00135742a00a66a048eb8d5d0a802199aa81401610009aba150033335502875c40026ae854008c0b8d5d09aba2500223263203533573806c06a06626ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aab9e5001137540026ae854008c078d5d09aba2500223263202733573805004e04a204c264c6404c66ae7124010350543500026135573ca00226ea80044d55ce9baa001223355300812001235001223355035002333500123355300c1200123500122335503900235500d0010012233355500801000200123355300c1200123500122335503900235500c00100133355500300b002001111222333553004120015030335530081200123500122335503500235500900133355300412001223500222533533355300d120013500b500e235001223300a002005006100313350340040035031001335530081200123500122323355036003300100532001355037225335001135500a003221350022253353300c002008112223300200a004130060030023200135503022112225335001100222133005002333553007120010050040011121222300300411212223001004123350222233350032200200200135001220013200135502c22112253350011502d22133502e300400233553006120010040013200135502b2211222533500113500322001221333500522002300400233355300712001005004001112330012253350021028100102522333573466e3c0080040980948d400488888888888802088ccdc62400000400244666ae68cdc38010008118110919118011bac001320013550262233335573e0024a04c466a04a60086ae84008c00cd5d100100a119191999ab9a3370e6aae7540092000233221233001003002300c35742a004600a6ae84d5d1280111931900a19ab9c015014012135573ca00226ea80048c8c8c8c8cccd5cd19b8735573aa00890001199991110919998008028020018011919191999ab9a3370e6aae7540092000233221233001003002301535742a00466a01a0286ae84d5d1280111931900c99ab9c01a019017135573ca00226ea8004d5d0a802199aa8043ae500735742a0066464646666ae68cdc3a800a4008464244460040086ae84d55cf280191999ab9a3370ea0049001119091118008021bae357426aae7940108cccd5cd19b875003480008488800c8c98c806ccd5ce00e00d80c80c00b89aab9d5001137540026ae854008cd4025d71aba135744a004464c6402a66ae7005805404c4d5d1280089aba25001135573ca00226ea80044cd54005d73ad112232230023756002640026aa04644646666aae7c008940908cd408ccd54094c018d55cea80118029aab9e500230043574400602426ae84004488c8c8cccd5cd19b875001480008d401cc014d5d09aab9e500323333573466e1d400920022500723263201233573802602402001e26aae7540044dd50008909118010018891000919191999ab9a3370ea002900311909111180200298039aba135573ca00646666ae68cdc3a8012400846424444600400a60126ae84d55cf280211999ab9a3370ea006900111909111180080298039aba135573ca00a46666ae68cdc3a8022400046424444600600a6eb8d5d09aab9e500623263201033573802202001c01a01801626aae7540044dd5000919191999ab9a3370e6aae7540092000233221233001003002300535742a0046eb4d5d09aba2500223263200c33573801a01801426aae7940044dd50009191999ab9a3370e6aae75400520002375c6ae84d55cf280111931900519ab9c00b00a00813754002464646464646666ae68cdc3a800a401842444444400646666ae68cdc3a8012401442444444400846666ae68cdc3a801a40104664424444444660020120106eb8d5d0a8029bad357426ae8940148cccd5cd19b875004480188cc8848888888cc008024020dd71aba15007375c6ae84d5d1280391999ab9a3370ea00a900211991091111111980300480418061aba15009375c6ae84d5d1280491999ab9a3370ea00c900111909111111180380418069aba135573ca01646666ae68cdc3a803a400046424444444600a010601c6ae84d55cf280611931900999ab9c01401301101000f00e00d00c00b135573aa00826aae79400c4d55cf280109aab9e5001137540024646464646666ae68cdc3a800a4004466644424466600200a0080066eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d4009200023212230020033008357426aae7940188c98c8030cd5ce00680600500489aab9d5003135744a00226aae7940044dd5000919191999ab9a3370ea002900111909118008019bae357426aae79400c8cccd5cd19b875002480008c8488c00800cdd71aba135573ca008464c6401266ae7002802401c0184d55cea80089baa00112232323333573466e1d400520042122200123333573466e1d40092002232122230030043006357426aae7940108cccd5cd19b87500348000848880088c98c8028cd5ce00580500400380309aab9d5001137540024646666ae68cdc3a800a4004402846666ae68cdc3a801240004028464c6400c66ae7001c01801000c4d55ce9baa001498480052410350543100233002501000132001355011222533500110022213500222330073330080020060010033200135501022225335001100222135002225335333573466e1c005200001301213330080070060031333008007335014123330010080030020060031123300100200b2253350021001100a1233500222333500322002002001350012200112212330010030022233371800466e04dc6800801000a40144466e00008004c8004d5402088cd400520002235002225335333573466e3c0080340240204c01c0044c01800cc8004d5401c88cd400520002235002225335333573466e3c00803002001c40044c01800c4880084880044488008488488cc00401000c448848cc00400c009221001123230010012233003300200200133351222513335122233512233002300448811cddf65cd8272fca8ee6ef4ae72019f01e134eaf5c7b7f9bac8940696300500722123300100300220012122300200321223001003200112122300200311220011200133512233002488120568ea530dfe90b2a0890b340eac46b3c58ce298eb67cee047e2463ea105f4cdd00480008848cc00400c0088005",
};

const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

// onchain.hs: refValidator
const refScript: SpendingValidator = {
  type: "PlutusV2",
  script:
    "590c36590c330100003232323322332232323232323232323232323232323232323232323233223232323232323232323232332232322323222323253353332223232323232330303332001503148004d54014888888010cc0c0ccc800540c5200135500522222200133030330175001355005222222006330303301750013550052222220033303033017330180325003488105283232322900330303301733018032500448810528313030290033030330173302f03250033302f03250043301735500222001500413550012200215335302a3232335530141200123500122335503d0023355301712001235001223355040002333500123303a4800000488cc0ec0080048cc0e80052000001335530141200123500122335503d00233350012335530181200123500122335504100235501a0010012233355501501c0020012335530181200123500122335504100235501900100133355501001700200132335530141200123500122335503d002335530171200123500122335504000233704900080080080099a81b99aa81c81d19a81b99aa81c81d1819800a81c281c191a8009111001991a800910009aa99a9a802111a8011111111111111999a8069281612816128161199aa98110900099a81191299a801108018800a81611a80091299aa99a999ab9a3371e6a004440046a0084400408e08c2666ae68cdc39a801110009a80211000823823082309a8180018a817806908918008010b10008b1109a801111299a802099aa81e801801110b09aa80111111100289aa8009111110010a99a9813991a8009111111111110041a800910010b1109a801111299a8020b1109a801111299a802089199999800804804003802001801110b1999ab9a3370e6aae7540192000233221233001003002333550162001200135742a00c6eb4d5d09aba250062326320233357380480460426666ae68cdc39aab9d37540089000101191931901199ab9c0240230213333573466e1cd55cea80124000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd4080084d5d0a80619a8100109aba1500b33502002235742a014666aa048eb9408cd5d0a804999aa8123ae502335742a01066a0400566ae85401cccd540900b1d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd40d9d69aba150023037357426ae8940088c98c80e4cd5ce01d01c81b89aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a81b3ad35742a004606e6ae84d5d1280111931901c99ab9c03a039037135573ca00226ea8004d5d09aba2500223263203533573806c06a06626aae7940044dd50009aba1500533502075c6ae854010ccd540900a08004d5d0a801999aa8123ae200135742a00460546ae84d5d1280111931901899ab9c03203102f135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a00460346ae84d5d1280111931901199ab9c024023021102213263202233573892010350543500022135573ca00226ea80044d55cf280089baa00111122233355300412001502b335530071200123500122335503000235500900133355300412001223500222533533355300c120013233500e22333500322002002001350012200112330012253350021031100102e235001223300a0020050061003133502f004003502c001335530071200123500122323355031003300100532001355032225335001135500a003221350022253353300c002008112223300200a004130060030023200135502b221122253350011002221330050023335530071200100500400111212223003004112122230010043200135502822112253350011502922133502a30040023355300612001004001320013550272211222533500113500322001221333500522002300400233355300712001005004001122123300100300222333573466e3c00800408808488ccdc6240000040022464460046eb0004c8004d5409088cccd55cf80092812119a81198021aba1002300335744004028464646666ae68cdc39aab9d5002480008cc8848cc00400c008c030d5d0a80118029aba135744a004464c6402866ae700540500484d55cf280089baa0012323232323333573466e1cd55cea8022400046666444424666600200a0080060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008c054d5d0a80119a80680a1aba135744a004464c6403266ae7006806405c4d55cf280089baa00135742a008666aa010eb9401cd5d0a8019919191999ab9a3370ea0029002119091118010021aba135573ca00646666ae68cdc3a80124004464244460020086eb8d5d09aab9e500423333573466e1d400d20002122200323263201b33573803803603203002e26aae7540044dd50009aba1500233500975c6ae84d5d1280111931900a99ab9c016015013135744a00226ae8940044d55cf280089baa0011335500175ceb44488c88c008dd5800990009aa81091191999aab9f0022502223350213355023300635573aa004600a6aae794008c010d5d100180909aba100112232323333573466e1d400520002350073005357426aae79400c8cccd5cd19b875002480089401c8c98c8048cd5ce00980900800789aab9d5001137540022424460040062244002464646666ae68cdc3a800a400c46424444600800a600e6ae84d55cf280191999ab9a3370ea004900211909111180100298049aba135573ca00846666ae68cdc3a801a400446424444600200a600e6ae84d55cf280291999ab9a3370ea00890001190911118018029bae357426aae7940188c98c8040cd5ce00880800700680600589aab9d500113754002464646666ae68cdc39aab9d5002480008cc8848cc00400c008c014d5d0a8011bad357426ae8940088c98c8030cd5ce00680600509aab9e5001137540024646666ae68cdc39aab9d5001480008dd71aba135573ca004464c6401466ae7002c0280204dd5000919191919191999ab9a3370ea002900610911111100191999ab9a3370ea004900510911111100211999ab9a3370ea00690041199109111111198008048041bae35742a00a6eb4d5d09aba2500523333573466e1d40112006233221222222233002009008375c6ae85401cdd71aba135744a00e46666ae68cdc3a802a400846644244444446600c01201060186ae854024dd71aba135744a01246666ae68cdc3a8032400446424444444600e010601a6ae84d55cf280591999ab9a3370ea00e900011909111111180280418071aba135573ca018464c6402666ae7005004c04404003c03803403002c4d55cea80209aab9e5003135573ca00426aae7940044dd50009191919191999ab9a3370ea002900111999110911998008028020019bad35742a0086eb4d5d0a8019bad357426ae89400c8cccd5cd19b875002480008c8488c00800cc020d5d09aab9e500623263200c33573801a01801401226aae75400c4d5d1280089aab9e500113754002464646666ae68cdc3a800a400446424460020066eb8d5d09aab9e500323333573466e1d400920002321223002003375c6ae84d55cf280211931900499ab9c00a009007006135573aa00226ea8004488c8c8cccd5cd19b87500148010848880048cccd5cd19b875002480088c84888c00c010c018d5d09aab9e500423333573466e1d400d20002122200223263200a33573801601401000e00c26aae7540044dd50009191999ab9a3370ea0029001100911999ab9a3370ea0049000100911931900319ab9c007006004003135573a6ea800526120014910350543100233002500e0013200135500f222533500110022213500222330073330080020060010033200135500e22225335001100222135002225335333573466e1c005200001101013330080070060031333008007335012123330010080030020060032233371800466e04dc680080100091299a80108008804091199ab9a3370e00400201000e90051119b8000200132001355008223350014800088d4008894cd4ccd5cd19b8f00200d009008130070011300600332001355007223350014800088d4008894cd4ccd5cd19b8f00200c0080071001130060031220021220011122002122122330010040031122123300100300248900112323001001223300330020020011",
};

const refAddress = lucid.utils.validatorToAddress(refScript);

export async function mintNFT(
  assetName: string,
  metadata: Metadata,
): Promise<TxHash> {
  const refNft = policyId + utf8ToHex("(100)") + utf8ToHex(assetName); // The label is not finalized yet!
  const userToken = policyId + utf8ToHex("(222)") + utf8ToHex(assetName); // The label is not finalized yet!

  const [requiredUtxo] = await lucid.utxosByOutRef([{
    txHash: "568ea530dfe90b2a0890b340eac46b3c58ce298eb67cee047e2463ea105f4cdd",
    outputIndex: 0,
  }]);

  const mintRedeemer = Data.to(new Constr(0, []));

  const datumMetadata = Data.to(new Constr(0, [Data.fromJson(metadata), 1n])); // datum will be appended to witness set; only datum hash in reference output

  const tx = await lucid.newTx()
    .collectFrom([requiredUtxo])
    .mintAssets({ [refNft]: 1n, [userToken]: 1n }, mintRedeemer) // mint refNft and user token pair
    .payToContract(refAddress, datumMetadata, { [refNft]: 1n }) // send refNft to reference script address
    .payToAddress(await lucid.wallet.address(), { [userToken]: 1n }) // send userToken to user wallet address
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();
  return signedTx.submit();
}

export async function burnNFT(assetName: string): Promise<TxHash> {
  const refNft = policyId + utf8ToHex("(100)") + utf8ToHex(assetName); // The label is not finalized yet!
  const userToken = policyId + utf8ToHex("(222)") + utf8ToHex(assetName); // The label is not finalized yet!

  const [refUtxo] = await lucid.utxosAtWithUnit(refAddress, refNft);

  const burnRedeemer = Data.to(new Constr(1, []));

  const tx = await lucid.newTx()
    .collectFrom([refUtxo], Data.empty())
    .mintAssets({ [refNft]: -1n, [userToken]: -1n }, burnRedeemer) // burn refNft and user token pair
    .attachSpendingValidator(refScript)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();
  return signedTx.submit();
}

export async function viewNFT(assetName: string): Promise<Metadata> {
  const refNft = policyId + utf8ToHex("(100)") + utf8ToHex(assetName); // The label is not finalized yet!
  const [refUtxo] = await lucid.utxosAtWithUnit(refAddress, refNft);

  if (!refUtxo) return {} as Metadata;

  const datum = Data.from(await lucid.datumOf(refUtxo)) as Constr<PlutusData>;
  const metadata: Metadata = Data.toJson(datum.fields[0]);

  return metadata;
}

/*
  Example:

  // Mint
  const txHash = await mintNFT("cip68", { name: "CIP-0068 NFT", image: "ipfs://<hash>" });
  console.log(txHash);

  // Burn
  const txHash = await burnNFT("cip68", { name: "CIP-0068 NFT", image: "ipfs://<hash>" });
  console.log(txHash);

  // View
  const metadata = await viewNFT("cip68")
  console.log(metadata);

*/
