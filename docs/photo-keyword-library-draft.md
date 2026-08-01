# WalkingWithGod Photo Keyword Library — Draft

Status: design draft only; no runtime code should consume this file yet.

## Selection contract

1. Match longest phrases before individual words: `living water` before `water`, `hand of God` before `hand` or `God`.
2. Prefer directly photographable nouns over concepts.
3. If several nouns have the same priority, choose one randomly.
4. Choose one Unsplash query randomly from that noun's stable candidate list.
5. Use concept mappings only when no higher-priority concrete noun matched.
6. If nothing matched, choose from the complete approved query library—not a nature-only fallback.
7. Ask Unsplash for a new photo on every verse selection and every background advance.
8. Remember recent Unsplash photo IDs and retry up to three times when a duplicate is returned.
9. Never append `nature` or `landscape` unless the selected subject genuinely requires it.
10. Preserve singular, plural, spelling, and important phrase variants.

Priority levels:

- **100 — exact phrase or specific object**
- **90 — concrete noun**
- **70 — stable faith/relationship concept**
- **50 — abstract concept translated to visible objects**
- **10 — global random fallback**

## Faith and worship

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| God, Lord, kingdom of God | Jesus; Christian cross; worship; Christian worship; raised hands worship | 70 |
| Jesus, Christ, Messiah, Saviour, Son of God | Jesus; Jesus cross; Christian cross; cross at sunrise | 70 |
| cross | Christian cross; wooden cross; cross at sunrise; cross silhouette | 100 |
| worship, praise | Christian worship; raised hands worship; church worship; worship music | 70 |
| prayer, pray, praying | kneeling prayer; hands in prayer; Bible and prayer; person praying | 70 |
| Bible, scripture, word of God, gave the word | open Bible; Bible by window; Bible and candle; Bible pages | 100 |
| scroll, book, written word | ancient scroll; parchment scroll; old book; scripture scroll | 100 |
| church | church interior; small church; church window; church at sunrise | 100 |
| temple, sanctuary | ancient temple; sanctuary interior; sacred architecture | 100 |
| altar | church altar; candlelit altar; stone altar | 100 |
| angel, angels | angel statue; angel wings; angel silhouette | 90 |
| heaven, heavens | stars; night sky; light through clouds; open sky | 50 |
| holy, holiness | worship; church light; white candle; cross | 50 |
| faith | cross; open Bible; worship; praying hands | 70 |
| gospel, redemption, salvation | cross; open Bible; worship; sunrise cross | 70 |
| resurrection, risen, rise again | empty tomb; sunrise cross; sunrise; open tomb | 70 |
| baptism | baptism water; river baptism; water drops; church baptism | 90 |
| advent, Christmas | advent candles; nativity; Christmas church; Bethlehem | 70 |

## People and relationships

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| love, beloved | parent and child; mother and child; father and child; wedding rings; family embrace; holding baby | 70 |
| father | father and child; father holding baby; father and daughter; father and son | 90 |
| mother | mother and child; mother holding baby; mother and daughter; mother and son | 90 |
| parent, parents | parent and child; family embrace; holding child | 90 |
| child, children | child; children playing; child holding hand; child in sunlight | 90 |
| baby, infant | baby; holding baby; sleeping baby | 90 |
| son | father and son; mother and son; son silhouette | 90 |
| daughter | father and daughter; mother and daughter; daughter silhouette | 90 |
| family, families | family embrace; family walking; parent and child; family hands | 90 |
| bride | bride; bridal veil; bride holding flowers; wedding rings | 90 |
| bridegroom, groom | groom; bride and groom; wedding rings | 90 |
| wedding, marriage | wedding rings; bride and groom; wedding hands; wedding ceremony | 90 |
| husband, wife | wedding rings; married couple hands; bride and groom | 90 |
| brother, brothers | brothers; siblings; brother helping brother | 90 |
| sister, sisters | sisters; siblings; sister embrace | 90 |
| friend, friends | friends together; friendship hands; friends walking | 90 |
| neighbour, stranger | welcoming doorway; helping hand; shared meal | 50 |
| widow, orphan | helping hand; parent and child; comforting embrace | 50 |
| servant | servant hands; person serving food; humble service | 70 |
| shepherd | shepherd; shepherd and flock; shepherd staff | 100 |
| fisherman | fisherman; fishing net; fishing boat | 100 |
| farmer, sower | farmer; sowing seed; hands planting seed | 100 |
| carpenter | carpenter; woodworking hands; wooden tools | 100 |
| potter | potter; clay vessel; hands shaping clay | 100 |
| king | crown; throne; king silhouette | 90 |

## Plants and agriculture

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| lily, lilies | white lily; lily flower; lilies in bloom | 100 |
| rose, roses | rose; red rose; white rose; roses in bloom | 100 |
| flower, flowers | flower close-up; flowers in bloom; wildflowers | 90 |
| vine, vines | grape vine; vine branches; vineyard | 100 |
| grape, grapes | grapes; grape vine; vineyard grapes | 100 |
| vineyard | vineyard; vineyard rows; vineyard at harvest | 100 |
| fig, fig tree | figs; fig tree; fig leaves | 100 |
| olive, olive tree, olive trees | olives; olive branch; ancient olive tree; olive grove | 100 |
| branch, branches | tree branch; branches in sunlight; vine branches | 100 |
| seed, seeds | seed in hand; seed in soil; seedling | 100 |
| mustard seed | mustard seed; tiny seed in hand; mustard plant | 100 |
| wheat | wheat; wheat field; wheat in hand | 100 |
| grain | grain; grain in hand; grain field | 100 |
| harvest | harvest; wheat harvest; harvest basket | 90 |
| grass | green grass; grass with dew; field of grass | 90 |
| thorn, thorns | thorn branch; crown of thorns; thorns close-up | 100 |
| reed, crushed reed, crushed stem | reed; reeds by water; single reed | 100 |
| tree, trees | tree; ancient tree; tree in field | 90 |
| fruit | fruit on tree; fruit basket; ripe fruit | 90 |
| palm, palm tree | palm tree; palm branches; desert palms | 100 |
| garden | garden; garden path; garden flowers | 90 |

## Food, drink, and vessels

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| bread, loaf | loaf of bread; bread on table; breaking bread | 100 |
| wine | wine glass; cup of wine; red wine; grapes; vineyard | 100 |
| cup | cup; wooden cup; cup of wine; cup on table | 100 |
| water jar, jar | clay water jar; ancient clay jar; jar on table | 100 |
| vessel, vessels | clay vessel; ceramic vessel; ancient vessel | 100 |
| bowl | wooden bowl; bowl on table; clay bowl | 100 |
| table | table; shared table; simple meal; table by window | 90 |
| meal, feast | shared meal; feast table; family meal | 90 |
| fish | fish; fishing catch; fish and bread | 100 |
| honey | honey; honeycomb; honey jar | 100 |
| milk | milk; cup of milk; milk and bread | 100 |
| oil, olive oil | olive oil; oil jar; oil lamp | 100 |
| salt | salt; salt crystals; salt in hand | 100 |
| food | bread and fruit; simple meal; shared food | 70 |
| drink | cup of water; cup on table; pouring water | 70 |

## Water and land

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| living water | clear spring water; flowing river; water spring | 100 |
| water, waters | water; clear water; water surface; flowing water | 90 |
| river | river; flowing river; river through forest | 100 |
| stream, brook | stream; forest stream; mountain brook | 100 |
| spring, fountain | natural spring; fountain water; spring water | 100 |
| well | water well; ancient well; stone well | 100 |
| sea | sea; ocean waves; calm sea; stormy sea | 100 |
| ocean | ocean; ocean waves; open ocean | 100 |
| wave, waves | ocean wave; waves; crashing waves | 100 |
| shore, beach | empty shore; beach; footsteps on beach | 100 |
| harbour | harbour; fishing harbour; quiet harbour | 100 |
| Jordan, Jordan River | Jordan River; river in Jordan | 100 |
| mountain, mountains | mountain; mountain peak; mountains in mist | 100 |
| hill, hills | green hills; rolling hills; hill at sunrise | 100 |
| valley | valley; green valley; valley in mist | 100 |
| rock | rock; massive rock; rock by sea | 100 |
| stone, stones | stone; ancient stones; stone path | 100 |
| cave | cave; cave entrance; light inside cave | 100 |
| wilderness | wilderness; desert wilderness; wilderness path | 100 |
| desert | desert; desert dunes; desert road | 100 |
| field | field; open field; field at sunrise | 90 |
| path | path; forest path; mountain path | 100 |
| road, way | road; road to horizon; winding road | 100 |
| footsteps | footsteps; footsteps in sand; walking feet | 100 |

## Sky, weather, light, and time

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| light | light beam; sunlight; light through clouds; candle light | 90 |
| feebly burning light | candle; candle light; small flame | 100 |
| lamp, oil lamp | oil lamp; ancient lamp; lamp in darkness | 100 |
| candle | candle; candle light; single candle | 100 |
| fire, flame | fire; flame; campfire; candle flame | 100 |
| pillar of fire | pillar of fire; fire in desert; desert fire at night | 100 |
| cloud, clouds | cloud; dramatic clouds; cloud over desert | 100 |
| pillar of cloud | pillar of cloud; desert cloud; cloud column | 100 |
| sun | sun; sunlight; sun through clouds | 100 |
| sunrise, dawn | sunrise; dawn; morning light | 100 |
| sunset | sunset; sunset sky; sun on horizon | 100 |
| moon | moon; moonlight; moon over water | 100 |
| star, stars | stars; night sky; stars over mountains | 100 |
| sky | sky; open sky; dramatic sky | 90 |
| rain | rain; rain on window; rain drops | 100 |
| rainbow | rainbow; rainbow after rain | 100 |
| snow | snow; snowy field; snow-covered tree | 100 |
| ice | ice; glacier; ice crystals | 100 |
| wind | wind in grass; wind in trees; windswept field | 90 |
| storm | storm; storm clouds; stormy sea | 100 |
| lightning | lightning; lightning storm | 100 |
| morning | morning light; sunrise; morning window | 90 |
| night | night; night sky; moonlit night | 90 |
| time, appointed time | hourglass; clock; sundial | 70 |
| day, days | sunrise; daylight; calendar pages | 50 |

## Animals

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| sheep | sheep; flock of sheep; sheep on hillside | 100 |
| lamb | lamb; lamb in field; young lamb | 100 |
| flock | flock of sheep; shepherd and flock | 100 |
| eagle, eagles | eagle; eagle flying; eagle wings | 100 |
| wing, wings | bird wings; eagle wings; sheltering wings | 100 |
| dove | dove; white dove; dove flying | 100 |
| bird, birds | bird; birds flying; bird in sky | 90 |
| sparrow, sparrows | sparrow; sparrow on branch | 100 |
| raven, ravens | raven; raven flying; raven on branch | 100 |
| lion | lion; lion portrait; lion in grass | 100 |
| donkey | donkey; donkey on road | 100 |
| horse, horses | horse; horses running; horse on field | 100 |
| serpent, snake | snake; serpent; snake in grass | 100 |
| butterfly | butterfly; butterfly on flower | 100 |

## Buildings, places, and travel

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| house, home | house; home; house in countryside | 90 |
| room | room; quiet room; sunlit room | 90 |
| window | window; light through window; rain on window | 100 |
| door | door; open door; light through door | 100 |
| gate | gate; ancient gate; open gate | 100 |
| wall | wall; ancient stone wall; city wall | 100 |
| tower | tower; stone tower; watchtower | 100 |
| city | city; city street; city at dawn | 90 |
| prison | prison bars; prison window; chains | 100 |
| tomb | empty tomb; stone tomb; tomb entrance | 100 |
| stable | stable; wooden stable; nativity stable | 100 |
| tent | tent; desert tent; tent under stars | 100 |
| Jerusalem | Jerusalem; Jerusalem old city; Western Wall | 100 |
| Bethlehem | Bethlehem; Bethlehem church; Bethlehem landscape | 100 |
| Galilee, Sea of Galilee | Sea of Galilee; Galilee shore | 100 |
| Israel | Israel; Jerusalem; Israel desert | 100 |
| Egypt | Egypt; Egyptian desert; Nile River | 100 |
| boat, ship | boat; fishing boat; boat on lake | 100 |
| net, fishing net | fishing net; fisherman net; net by boat | 100 |

## Body, emotion made visible, and clothing

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| hand, hands | hand; open hands; hands holding light; helping hand | 100 |
| hand of God | hand reaching from light; hand of God; helping hand | 100 |
| foot, feet | feet; walking feet; bare feet on path | 100 |
| eye, eyes | eyes; close-up eyes; eyes looking upward | 100 |
| ear, ears | ear; listening; child listening | 90 |
| face | face; face in sunlight; looking upward | 90 |
| tear, tears, weeping | tears; crying eyes; rain on window | 90 |
| arm, arms | open arms; parent holding child; embrace | 90 |
| heart, hearts | hands over heart; heart-shaped hands; parent and child | 70 |
| flesh, body | hands; human silhouette; body silhouette | 50 |
| clothing, garment | linen clothing; white garment; folded cloth | 90 |
| wool | wool; white wool; sheep wool | 100 |
| sandal, sandals | sandals; ancient sandals; feet in sandals | 100 |

## Protection, conflict, wealth, and tools

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| shield | shield; ancient shield; sword and shield | 100 |
| sword | sword; ancient sword; sword on ground | 100 |
| armour, armor | armour; ancient armor; armor and shield | 100 |
| helmet | helmet; ancient helmet; armor helmet | 100 |
| fortress, stronghold | fortress; stone fortress; castle wall | 100 |
| refuge, shelter | shelter; cave shelter; shelter in rain | 70 |
| chain, chains | chain; broken chain; prison chains | 100 |
| crown | crown; golden crown; crown on table | 100 |
| crown of thorns | crown of thorns; thorns and cross | 100 |
| throne | throne; empty throne; royal chair | 100 |
| ring, rings | ring; wedding rings; ring on hand | 100 |
| key, keys | key; antique key; key in hand | 100 |
| treasure, wealth, riches | treasure chest; gold coins; pearl; jewels | 100 |
| gold | gold; gold coins; golden crown | 100 |
| silver | silver; silver coins; silver cup | 100 |
| pearl, pearls | pearl; pearls; pearl in shell | 100 |
| rod, staff | shepherd staff; wooden staff; walking staff | 100 |
| yoke | wooden yoke; ox yoke; old farm yoke | 100 |
| clay | clay; hands shaping clay; clay vessel | 100 |

## Music

| Verse triggers | Stable Unsplash candidates | Priority |
|---|---|---:|
| harp | harp; hands playing harp | 100 |
| lyre | lyre; ancient lyre | 100 |
| trumpet | trumpet; trumpet in church; musician trumpet | 100 |
| horn | horn instrument; ancient horn; shofar | 100 |
| instrument, instruments | musical instruments; worship instruments | 90 |
| song, singing | singing; choir; worship singing | 70 |
| choir | choir; church choir | 100 |

## Abstract concepts translated only when necessary

| Verse triggers | Stable visible candidates | Priority |
|---|---|---:|
| peace, rest, be still | still water; calm sea; sleeping child; white dove | 50 |
| hope | sunrise; open door; seedling; dawn | 50 |
| strength, power, courage | ancient tree; mountain; shield; eagle | 50 |
| protection, safe | shield; shelter; wings; fortress | 50 |
| guidance, guide, lead | path; lighthouse; road; lamp | 50 |
| mercy, compassion, pity | helping hand; parent and child; comforting embrace | 50 |
| grace | open hands; light through clouds; worship | 50 |
| forgiveness | open hands; embrace; cross | 50 |
| sorrow, grief, trouble | tears; rain on window; empty chair; solitary tree | 50 |
| joy, rejoice | child laughing; celebration; sunrise; flowers | 50 |
| eternal, forever | stars; horizon; night sky | 50 |
| life | seedling; child; tree; sunrise | 50 |
| death | candle; empty chair; tomb; fading flower | 50 |
| freedom, free | broken chains; open gate; bird flying | 50 |
| wisdom, knowledge | old book; Bible; lamp; reading | 50 |

## Morphology and phrase aliases

Treat each row as one trigger family:

| Canonical concept | Required variants |
|---|---|
| child | child; children |
| person | person; people; man; men; woman; women |
| foot | foot; feet; footsteps |
| hand | hand; hands |
| heart | heart; hearts |
| wing | wing; wings |
| branch | branch; branches |
| lily | lily; lilies |
| grape | grape; grapes |
| word | word; words |
| day | day; days |
| life | life; lives |
| wife | wife; wives |
| brother | brother; brothers |
| sister | sister; sisters |
| star | star; stars |
| angel | angel; angels |
| sheep | sheep |

Phrase precedence examples:

1. `pillar of fire` before `fire`
2. `pillar of cloud` before `cloud`
3. `living water` before `water`
4. `mustard seed` before `seed`
5. `hand of God` before `hand` or `God`
6. `crown of thorns` before `crown` or `thorns`
7. `Sea of Galilee` before `sea`
8. `word of God` before `word` or `God`
9. `good shepherd` before `shepherd`
10. `wedding rings` before `ring`

## Open design questions

1. Should violent or dark subjects (`sword`, `prison`, `death`, `serpent`) participate in the global no-match fallback, or only when explicitly present in the verse?
2. Should location preference be appended to every selected query, or only to place-compatible subjects?
3. Should recently seen photo IDs be stored per browser, globally in Worker cache, or both?
4. Should the retry limit for duplicate photos be two or three additional Unsplash calls?
5. Should the global fallback use every approved candidate or a smaller broadly safe subset?
