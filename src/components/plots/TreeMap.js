import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import {Col, Row, Container} from "react-bootstrap";
import ReactResizeDetector from 'react-resize-detector';
import {text} from "@fortawesome/fontawesome-svg-core";
import API from "../../lib/api/API";
import GroupTitle from "./GroupTitle";
import MyLabel from "./ui/MyLabel";
//
// const data =
//           {
//               "children": [{
//                   "name": "topic 1",
//                   "children": [{
//                       "name": "Zielgruppe und Auswirkungen Das Eigentum an der Idee und ihren Umsetzungsergebnissen, einschließlich der Rechte an gewerblichem und geistigem Eigentum, sowie an allen diesbezüglichen Berichten und sonstigen Dokumenten verbleibt beim Antragsteller. . Gliederung ",
//                       "group": "A",
//                       "value": 50,
//                       "colname": "level3"
//                   }, {"name": "Dies wird Menschen jeden Alters und jeder Herkunft helfen, die unter steigenden Kosten und statischen Löhnen leiden. Es wird dazu beitragen, die Armut in der Kindheit zu lindern und die Kriminalität zu verringern, die von Menschen verursacht wird, die verzweifelt nach Nahrung suchen. Das allgemeine Gesundheitsniveau der Bevölkerung wird sich verbessern - dies wird sich auf den Gesundheitssektor und das Budget auswirken. Lebensmittelbanken werden davon profitieren, da ihre Nutzung stark angestiegen ist und sie nur über begrenzte Ressourcen verfügen. Käufer können einen kleinen Beitrag leisten, dies hat jedoch insgesamt enorme Auswirkungen!. Machen Sie das Spenden an Lebensmittelbanken einfach und unbemerkt von Ihrem Geldbeutel, indem Sie Spendenmechanismen in Internet-Shopping-Sites integrieren. Ein paar Pence machen einen großen Unterschied. Alles was Sie tun müssen, ist abzurunden!", "group": "A", "value": 50, "colname": "level3"}, {
//                       "name": "SelbstBeStimmt kommt zunächst und am unmittelbarsten den Künstlern selbst zugute, die jeden Tag daran arbeiten, das Produkt auf der Bühne / auf der Leinwand zu kreieren. Sie werden * mehr Wissen über ihre Rechte * mehr Verhandlungsmacht in Bezug auf Löhne * ein Gefühl der Gemeinschaft und Solidarität haben. SelbstBeStimmt wird letztendlich den Politikern und den Bürgern zugute kommen, indem es Folgendes ermöglicht: * verantwortungsbewusster Umgang mit öffentlichen Mitteln * mehr Transparenz und verantwortungsbewusstere Demokratie * ein Gefühl der „Eigenverantwortung“ für die Theater SelbstBeStimmt wird der Kunstform dienen, indem: * die Nachhaltigkeit durch erhöht wird Unterstützung eines effektiveren und verantwortungsvolleren Umgangs mit Ressourcen * Steigerung des Bewusstseins und hoffentlich des Interesses am Genre * Einbeziehung der öffentlichen Unterstützung zur Aufrechterhaltung dieser gefährdeten Kunstform. . Eine Online-Plattform, um klassisch ausgebildete Sänger zu befähigen. Als entbehrlich angesehen, werden Künstler zu Bürgern zweiter Klasse in der Musikwelt verbannt, was die langfristige Nachhaltigkeit der klassischen Musik gefährdet. SelbstBeStimmt wird dieses System ändern. ",
//                       "group": "C",
//                       "value": 50,
//                       "colname": "level3"
//                   }, {"name": "Bis 2066 wird in Großbritannien eine halbe Million Menschen über 100 Jahre alt sein, was die europäischen Trends widerspiegelt. Neben einem allgemeinen physischen und sensorischen Rückgang ist das Altern mit dem Auftreten eines peripheren Sehdefizits sowie mit den das Gehirn beeinflussenden Zuständen wie Hemianopie und Vernachlässigung verbunden. Der Rückgang der Mobilität und das Vorhandensein eines visuellen Defizits schränken die Chance der Menschen ein, die jüngsten Verbesserungen in der Forschung zu nutzen, da Dienstleistungen häufig nur in spezialisierten Zentren erbracht werden. Die Möglichkeit für Patienten, ihre Rehabilitationsübungen autonom durchzuführen, wird wahrscheinlich die Ergebnisse optimieren, gleichzeitig das Selbstvertrauen und das soziale Wohlergehen der Patienten verbessern und den allgemeinen Stress für sie und ihre Pflegekräfte verringern. Die Idee ist, Menschen mit Sehbehinderung zu versorgen Defizit mit einem Rehabilitationsparadigma, das zu Hause unter Ausnutzung der akustischen Modalität und der etablierten audiovisuellen multisensorischen Verbesserung eingesetzt werden kann. \n", "group": "C", "value": 50, "colname": "level3"}],
//                   "colname": "level2"
//               }, {
//                   "name": "topic 2",
//                   "children": [{
//                       "name": "Zuallererst werden Feuerwehrleute von dieser Innovation profitieren. Feuerwehrmann ist ein Job mit einem hohen Risiko. Das Verringern der Suchzeit und das Erkennen von verstecktem Feuer erhöht die Sicherheit für den Feuerwehrmann erheblich, da er weniger Zeit in dem brennenden Gebäude hat. Zweitens profitieren Brandopfer, da sich ihre Überlebenschancen bei einem Brand erhöhen. Natürlich werden die sozialen Auswirkungen viel größer sein, da die Verhinderung des Todes von Verwandten und die Verringerung der Auswirkungen von Feuerwunden Auswirkungen auf die gesamte Gesellschaft haben. In größerem Umfang kann die Technologie in vielen Situationen eingesetzt werden, nicht nur von Feuerwehrleuten, sondern auch von Polizisten und Krankenwagenpersonal. Der Kern der Innovation ist eine Technologie, die in einen Feuerwehrhelm integriert ist und die Sicht verbessert von Feuerwehrleuten, so dass sie Opfer sehen können, die durch Rauch versteckt sind. Dies wird die Rettung von Brandopfern beschleunigen und zur Sicherheit von Feuerwehrleuten beitragen. \n",
//                       "group": "C",
//                       "value": 14,
//                       "colname": "level3"
//                   }, {"name": "FIX ist eine bahnbrechende Anwendung für alle, die von Überschwemmungen betroffen sind oder an Vorsorge und Hilfe beteiligt sind: Bürger, Gemeinden, Ersthelfer und Hochwasserbehörden. Wo etablierte Hochwasserwarnsysteme existieren, ergänzt es komplexe Hochwassermodelle mit Bodendaten und überträgt standortspezifische Hochwasser- und reaktionsrelevante Informationen an die Bürger. Außerdem werden Schlüsseldaten für Behörden gesammelt. In Ermangelung zentraler Daten und ausgefeilter Reaktionsstrategien füllt die Fähigkeit zum Austausch von Informationen zwischen Bürgern diese Lücke. Durch die Ermöglichung der Eigenständigkeit und Widerstandsfähigkeit der betroffenen Gemeinden, die Bereitstellung von Echtzeitinformationen vor Ort für die Behörden und die Ermöglichung einer schnelleren und gezielteren Reaktion hat FIX tiefgreifende Auswirkungen auf Leben und Vermögenswerte, die weltweit von Überschwemmungen bedroht sind. Menschen bei Überschwemmungen Das Risiko benötigt standortspezifische Daten, um Schäden zu vermeiden. Sie verfügen wiederum über Informationen, die von den Behörden benötigt werden, um auf Überschwemmungen zu reagieren. FIX stellt diesen Link her; Es befähigt die Bürger und verwendet sie als Hochwassersensoren, um Hochwasserdaten eindeutig abzubilden und zu verbessern. ", "group": "A", "value": 11, "colname": "level3"}, {
//                       "name": "ScriptChecker könnte für Forschungseinrichtungen des öffentlichen Sektors, Universitäten, private Unternehmen und medizinische Forschungsinstitute von Interesse sein: All dies hängt von einem guten IP-Management ab, um weiterhin erfolgreich zu sein. Die erfolgreiche Einführung von ScriptChecker wird die Wettbewerbsposition dieser Organisationen stärken und Arbeitsplätze und Wachstum für die EU-Wirtschaft sichern. Um Auswirkungen auf die Gesellschaft insgesamt zu haben, müssen Institutionen Innovationen wie neue medizinische Behandlungen, saubere Energiequellen und Instrumente zur Bekämpfung der sozialen Ausgrenzung bereitstellen. Ohne eine sichere IP-Position (z. B. Patent oder vertrauliches Know-how) wird der Privatsektor jedoch nicht in die Produkt- / Dienstleistungsentwicklung investieren. Durch die Straffung des IP-Managements wird ScriptChecker eine zentrale Rolle bei der Entwicklung der technologischen Lösungen der Zukunft spielen. . Geistiges Eigentum ist für die Entwicklung neuer Lösungen für drängende gesellschaftliche Herausforderungen von wesentlicher Bedeutung. Unsere Idee erkennt automatisch, wann IP diskutiert wird, und warnt Benutzer, um eine versehentliche Offenlegung zu vermeiden und Schutzmechanismen auszulösen. \n",
//                       "group": "B",
//                       "value": 15,
//                       "colname": "level3"
//                   }, {"name": "Zunächst werden die Feuerwehren von dieser Innovation profitieren. Feuerwehrmann ist ein Job mit einem hohen Risiko. Das Verringern der Suchzeit in einer Brandsituation erhöht die Sicherheit für den Feuerwehrmann, da er weniger Zeit in dem brennenden Gebäude (zum Beispiel) hat. Zweitens profitieren Brandopfer, da ihre Überlebenschancen bei einem Brand steigen. In einem größeren Umfang hat die Technologie das Potenzial, in vielen Situationen eingesetzt zu werden. Beispiele sind militärische oder polizeiliche Operationen unter extremen Bedingungen (z. B. Nebel oder Schnee). Auch die medizinische Industrie kann von diesem Produkt profitieren, beispielsweise in der Chirurgie (Sichtbarkeit trotz starker Blutungen). Der Kern der Innovation ist eine Technologie, die es Feuerwehrleuten ermöglicht, Opfer unter allen Bedingungen zu sehen. Diese Technologie ignoriert extreme Hitze und Rauch, die während eines Brandes entstehen. Auf diese Weise kann ein Feuerwehrmann den Ort der Opfer leicht identifizieren. \n", "group": "B", "value": 16, "colname": "level3"}],
//                   "colname": "level2"
//               }, {
//                   "name": "topic 3",
//                   "children": [{
//                       "name": "WarmStreet ist ideal für soziale Dienste, Wohltätigkeitsorganisationen, Wirtschaftspartner und Bürger, die dazu beitragen möchten, die Belastung durch Armut und soziale Ausgrenzung in ihrer Gemeinde zu minimieren, indem sie Hilfeanfragen verfolgen und Dienste anbieten, die dem Leben der am stärksten gefährdeten Personen zugute kommen. Als vielversprechende Plattform für soziale Innovation engagiert WarmStreet die Zivilgesellschaft bei der Schaffung und Erhaltung des Ökosystems, das erforderlich ist, um soziale Herausforderungen zu bewältigen und einen positiven Unterschied zwischen Einzelpersonen, Familien und der beteiligten Gemeinschaft zu bewirken. Die Auswirkungen des sozioökonomischen Nutzens von WarmStreets sind noch größer, wenn man die Erfassung wertvoller Daten zur Überwachung von Armut und sozialer Ausgrenzung sowie deren Beitrag zur Verringerung der Belastung der lokalen, regionalen und nationalen Systeme der öffentlichen sozialen Dienste in Betracht zieht. WarmStreet erstellt ein solidarisches Webportal soziale Dienste, Wohltätigkeitsorganisationen, Wirtschaftspartner, Bürger und Menschen, die von Armut und sozialer Ausgrenzung betroffen sind, zu vernetzen und den am stärksten gefährdeten Personen rechtzeitig Hilfe zu leisten. \n",
//                       "group": "B",
//                       "value": 10,
//                       "colname": "level3"
//                   }, {"name": "Die Zielgruppe sind die ärmsten EU-Bürger, die sich keinen Festnetzanschluss leisten können und sich in der Regel auf Pay-As-You-Go-Mobiltelefone verlassen. Die Möglichkeit, mit Skype zu telefonieren, wird höchstwahrscheinlich die Kosten für Mobiltelefongespräche senken, was wiederum dazu beiträgt, die voraussichtlichen Kosten pro Haushalt von 3,00 GBP (3,75 EUR) pro Monat zu decken. Durch den Zugang zum Basis-Internet wird die digitale Ausgrenzung verringert und die Gleichstellung gefördert. Es wird den Zugang zu wesentlichen Dienstleistungen wie Gesundheits-, Bildungs- und Sozialleistungen verbessern. Weitere Vorteile sind ein besserer Zugang zum Arbeitsmarkt, für den die Bürger besser gerüstet sind (d. H. Wirtschaftlich). Der Zugang zum Internet zu Hause hilft der Umwelt, indem weniger Reisen erforderlich sind (z. B. für den Zugang zur örtlichen Bibliothek), wodurch auch die Reisekosten für Haushalte gesenkt werden. Die Idee besteht darin, den Bewohnern ein kostengünstiges Basis-Internet zur Verfügung zu stellen von sozialem (betreutem) Wohnen, ohne dass jeder Haushalt für einzelne Festnetzanschlüsse bezahlen muss. Die geschätzten Kosten pro Haushalt für Großbritannien belaufen sich auf 3,00 GBP (3,75 EUR) pro Monat. \n", "group": "A", "value": 13, "colname": "level3"}, {
//                       "name": "\"Fall Proof\" richtet sich an ältere Menschen, ihre Freunde und ihre Verwandten. Es wird älteren Menschen zugute kommen, indem es ihnen die Informationen und Unterstützung gibt, die sie benötigen, um Reisen und Stürze zu Hause zu verhindern. Es wird auch besorgten Freunden und Verwandten einen Ort bieten, an dem sie mehr über die Änderungen erfahren können, die vorgenommen werden sollten, um ihren Lieben zu Hause mehr Unabhängigkeit zu geben. Gesundheits- und Sozialversicherer könnten dieses Tool auch verwenden, wenn sie ältere Bewohner zu Hause besuchen. Dienstleister wie diese profitieren von geringeren Kosten für ihre Dienste. Wenn das Zuhause eines jeden so sicher wie möglich ist, gibt es weniger Anträge auf Anpassung des Heims an den Gemeinderat, weniger Anforderungen an die Sozialfürsorge, weniger Krankenhauseinweisungen und Notrufe. Herbst Proof ist eine Web-App, die das Risiko von Stolpern und Stürzen im Haushalt verringert. Es wird älteren Menschen (und ihren Freunden und Verwandten) eine Reihe von Fragen zu ihrem Zuhause stellen und einen personalisierten Bericht mit maßgeschneiderten Ratschlägen und Supportinformationen bereitstellen. \n",
//                       "group": "A",
//                       "value": 13,
//                       "colname": "level3"
//                   }, {"name": "FoodSharing schafft einen tugendhaften Kreislauf, in dem Agenten - Einzelpersonen, Organisationen, Bieter - miteinander interagieren können. Dies schafft wirtschaftliche Vorteile, Werbemöglichkeiten und Synergien, die positive Effekte in größerem Maßstab erzielen sollen. Der Austausch zwischen verschiedenen Agenten würde den Mitarbeitern offensichtliche Vorteile bringen, da diejenigen, die über Überschüsse verfügen, diese sinnvollerweise an Personen weiterleiten können, die sie am dringendsten benötigen. Daher wäre es eine Form der Einkommenssteigerung, die neben dem wirtschaftlichen Aspekt auch eine erweiterte Form der Solidarität offenbart, die zweifellos für einen größeren Zusammenhalt und eine größere gesellschaftliche Akzeptanz sorgt. Der tugendhafte Prozess wird, sobald er abgeschlossen ist, seine Vorteile auch für die Umwelt ausweiten. Durch die nützliche Platzierung von Überschüssen wird Abfall und damit Müll reduziert. FoodSharing ermöglicht die Reduzierung von Lebensmittelverschwendung, indem Lebensmittelüberschüsse auf diejenigen umgeleitet werden, die sich in einem offensichtlichen Zustand wirtschaftlicher Benachteiligung befinden. Die Idee ist die Schaffung eines tugendhaften Kreislaufs, in dem Agenten interagieren, um solidarische Ziele zu erreichen \n", "group": "D", "value": 25, "colname": "level3"}, {
//                       "name": "Wir gingen von einer Idee von Dr. Elena Benigni aus, einer Allgemeinmedizinerin in Rom, die eine Doktorarbeit über \"Karte der Gesundheitsressourcen einer Arztpraxis\" schreibt. Sie machte auch den ersten Versuch, eine solche \"Karte\" auf RomaPaese zu prototypisieren. Zu den Zielen des Vorschlags gehören das Personal der Familienpflegedienste und direkter ihre Patienten: Wir möchten ihre Fähigkeit verbessern, sich ihren eigenen Problemen zu stellen und Lösungen zu finden, indem wir die Ressourcen in dem Gebiet nutzen, die die Maßnahmen von unterstützen könnten Der Doktor. Das vorgeschlagene System und seine Funktionen sollten indirekt zur Qualität und Nachhaltigkeit des nationalen öffentlichen Gesundheitssystems beitragen, indem die Wirksamkeit der Familienpflegedienste erhöht und der Druck auf Krankenhäuser und andere spezialisierte Strukturen verringert wird. Förderung der Entstehung von Unterstützungsnetzwerken mit Schwerpunkt auf die Büros von Allgemeinärzten oder in Pflegeheimen durch Nutzung, Aufwertung und Erweiterung von \"Ressourcenkarten\" aus einem größeren integrierten Verzeichnis sozialer und kultureller Ressourcen in einer Stadt. \n",
//                       "group": "D",
//                       "value": 16,
//                       "colname": "level3"
//                   }, {"name": "Die Zielgruppe wäre jeder, der Informationsbedarf hat, aber keine der Amtssprachen seines Gastlandes spricht. Benutzer können diejenigen sein, die in einem örtlichen Krankenhaus Rat suchen, Studenten, die zum ersten Mal auf dem Campus ankommen, Geschäftsleute, die an Flughäfen und Bahnhöfen ankommen, oder Touristen, die etwas über eine bestimmte Attraktion wissen möchten. Der Umwelt- und Nachhaltigkeitsvorteil würde durch weniger Drucksachen entstehen, was auch ein wirtschaftlicher Vorteil wäre. Ein weiterer solcher Vorteil würde sich aus einem höheren Tourismusniveau und hoffentlich mehr Geschäftstätigkeit ergeben. Der soziale Nutzen würde sich aus einer besseren und einladenderen Benutzererfahrung ergeben, bei der Benutzer einen besseren und schnelleren Zugang zu Diensten erhalten. Die Behebung des Sprachproblems bedeutet, dass NALIA Minderheitengruppen zugute kommt. Ein System, das automatisch die Muttersprache des Benutzers erkennt und standardmäßig Informationen in dieser Sprache anzeigt. Die Idee ist, die soziale Eingliederung und Gleichstellung in Bezug auf Gesundheitswesen, Gastgewerbe, Tourismus und andere Dienstleistungen zu verbessern. \n", "group": "D", "value": 28, "colname": "level3"}],
//                   "colname": "level2"
//               }], "name": "CEO"
//           };

class TreeMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            d3: '',
            w:200,
            h:200,
            overlayX:100,
            overlayY:100,
            overlayWidth:100,
            overlayHeight:100
        }
        this.svg = null;
        this.drawChart = this.drawChart.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }
    buildTree(groups){
        const area = this.treeMapDiv.clientWidth * this.treeMapDiv.clientHeight;

        // let areas = row.map((square) =>{
        //     let areaPx = (square.weight * area) / 100;
        // return areaPx;
        // })
        // console.log(areas)
        // "children": [{
        //     "name": "topic 1",
        //     "children": [{
        //         "name": "Zielgruppe und Auswirkungen Das Eigentum an der Idee und ihren Umsetzungsergebnissen, einschließlich der Rechte an gewerblichem und geistigem Eigentum, sowie an allen diesbezüglichen Berichten und sonstigen Dokumenten verbleibt beim Antragsteller. . Gliederung ",
        //         "group": "A",
        //         "value": 50,
        //         "colname": "level3"
        //     }, {"name": "Dies wird Menschen jeden Alters und jeder Herkunft helfen, die unter steigenden Kosten und statischen Löhnen leiden. Es wird dazu beitragen, die Armut in der Kindheit zu lindern und die Kriminalität zu verringern, die von Menschen verursacht wird, die verzweifelt nach Nahrung suchen. Das allgemeine Gesundheitsniveau der Bevölkerung wird sich verbessern - dies wird sich auf den Gesundheitssektor und das Budget auswirken. Lebensmittelbanken werden davon profitieren, da ihre Nutzung stark angestiegen ist und sie nur über begrenzte Ressourcen verfügen. Käufer können einen kleinen Beitrag leisten, dies hat jedoch insgesamt enorme Auswirkungen!. Machen Sie das Spenden an Lebensmittelbanken einfach und unbemerkt von Ihrem Geldbeutel, indem Sie Spendenmechanismen in Internet-Shopping-Sites integrieren. Ein paar Pence machen einen großen Unterschied. Alles was Sie tun müssen, ist abzurunden!", "group": "A", "value": 50, "colname": "level3"}, {
        //         "name": "SelbstBeStimmt kommt zunächst und am unmittelbarsten den Künstlern selbst zugute, die jeden Tag daran arbeiten, das Produkt auf der Bühne / auf der Leinwand zu kreieren. Sie werden * mehr Wissen über ihre Rechte * mehr Verhandlungsmacht in Bezug auf Löhne * ein Gefühl der Gemeinschaft und Solidarität haben. SelbstBeStimmt wird letztendlich den Politikern und den Bürgern zugute kommen, indem es Folgendes ermöglicht: * verantwortungsbewusster Umgang mit öffentlichen Mitteln * mehr Transparenz und verantwortungsbewusstere Demokratie * ein Gefühl der „Eigenverantwortung“ für die Theater SelbstBeStimmt wird der Kunstform dienen, indem: * die Nachhaltigkeit durch erhöht wird Unterstützung eines effektiveren und verantwortungsvolleren Umgangs mit Ressourcen * Steigerung des Bewusstseins und hoffentlich des Interesses am Genre * Einbeziehung der öffentlichen Unterstützung zur Aufrechterhaltung dieser gefährdeten Kunstform. . Eine Online-Plattform, um klassisch ausgebildete Sänger zu befähigen. Als entbehrlich angesehen, werden Künstler zu Bürgern zweiter Klasse in der Musikwelt verbannt, was die langfristige Nachhaltigkeit der klassischen Musik gefährdet. SelbstBeStimmt wird dieses System ändern. ",
        //         "group": "C",
        //         "value": 50,
        //         "colname": "level3"
        //     }, {"name": "Bis 2066 wird in Großbritannien eine halbe Million Menschen über 100 Jahre alt sein, was die europäischen Trends widerspiegelt. Neben einem allgemeinen physischen und sensorischen Rückgang ist das Altern mit dem Auftreten eines peripheren Sehdefizits sowie mit den das Gehirn beeinflussenden Zuständen wie Hemianopie und Vernachlässigung verbunden. Der Rückgang der Mobilität und das Vorhandensein eines visuellen Defizits schränken die Chance der Menschen ein, die jüngsten Verbesserungen in der Forschung zu nutzen, da Dienstleistungen häufig nur in spezialisierten Zentren erbracht werden. Die Möglichkeit für Patienten, ihre Rehabilitationsübungen autonom durchzuführen, wird wahrscheinlich die Ergebnisse optimieren, gleichzeitig das Selbstvertrauen und das soziale Wohlergehen der Patienten verbessern und den allgemeinen Stress für sie und ihre Pflegekräfte verringern. Die Idee ist, Menschen mit Sehbehinderung zu versorgen Defizit mit einem Rehabilitationsparadigma, das zu Hause unter Ausnutzung der akustischen Modalität und der etablierten audiovisuellen multisensorischen Verbesserung eingesetzt werden kann. \n", "group": "C", "value": 50, "colname": "level3"}],
        //     "colname": "level2"
        // }, {
        const tree = {
            children:groups.sort((g,g1) => g1.contributions.length - g.contributions.length).map((g) =>{
                const groupWeight = (g.contributions.length * area) / 100;
                return{
                    data:g,
                    name:'',
                    group:'',
                    colName:'',
                    children:g.contributions.map((c) =>{
                        return{
                            data:c,
                            name:'',
                            group:'',
                            value: 1,
                            colName:'',
                            children:[]
                        }
                    })
                }
            })
        }
        return tree;
    }
    loadData() {
        this.setState({isLoading: true})
        API.getContributions().then((res) => {
            if (res.success) {
                // this.props.onTopicsLoaded(res.topics);
                this.setState({
                    data: this.buildTree(res.topics),
                    isLoading: false
                }, () => {
                    this.drawChart(this.state.w,this.state.h);
                });
                clearInterval(this.colorsInterval);
            }
        })
    }
    onResize(w, h) {
        this.drawChart(w, h);
    }
    updateTreeMap(root,mouseOverId = null){

        const _this = this;
        // Give the data to this cluster layout:
        root.sum(function(d){
            if(d.hasOwnProperty('data')){
                if(d.data.hasOwnProperty('_id')){
                    if(d.data._id === mouseOverId){
                        console.log(mouseOverId);
                        return 10;
                    }
                }
            }
            return d.value;
        }) // Here the size of each leave is given in the 'value' field in input data
        // var root =  d3.hierarchy(data)
        // .sum(function(d) { return  d.value})
        this.treemap(root);
        var leaves = this.svg.selectAll('.leaf')
            .data(root.leaves(),function(d) {
                return d.data.data._id
            });

        // use this information to add rectangles:
        // this.svg
        //     .selectAll("rect")
        //     .data(root.leaves())
        //     .enter()
        const group =         leaves.enter()
            .append("g")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })


        group.append("rect")
            .classed('leaf',true)
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "white")
            .style("fill", function(d){ return d.parent.data.data.color} )
            .on('mouseenter',function(d) {
                const self = d3.select(this);

                _this.updateTreeMap(root,self.data()[0].data.data._id);
                // _this.drawChart(self.data()[0].data.data._id,treemap)
            })
            group.append("foreignObject")
                .classed('leaf',true)
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .append("xhtml:body")
                .attr("class","layover")
                .attr("xmlns","http://www.w3.org/1999/xhtml")
                .append("xhtml:div")
                .classed("divin",true)
                .text(function(d,i){return i})
                .on('mouseenter',function(d) {
                    const self = d3.select(this);

                    _this.updateTreeMap(root,self.data()[0].data.data._id);
                    // _this.drawChart(self.data()[0].data.data._id,treemap)
                })
        leaves
            .transition()
            .duration(1000)
            .attr('x', function(d) { return d.x0})
            .attr('y', function(d) { return d.y0})
            .attr('width', function(d) { return d.x1 - d.x0})
            .attr('height', function(d) { return d.y1 - d.y0})

    }
    drawChart(w, h) {
        const _this = this;
        // w = 500;
        // h = 500;
        this.setState({
            w,
            h
        })
        const data = this.state.data;
        if(!data){
            return null;
        }
        d3.select("#treemap").selectAll("*").remove()

        // append the svg object to the body of the page

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width  = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;

// append the svg object to the body of the page
        this.svg = d3.select("#treemap")
            .append("svg")
            .attr("xmlns","http://www.w3.org/2000/svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var root = d3.hierarchy(data).sum(function(d){
            return d.value
        }) // Here the size of each leave is given in the 'value' field in input data
        // Then d3.treemap computes the position of each element of the hierarchy
        this.treemap = d3.treemap()
            .size([width, height])
            .paddingTop(1)
            .paddingRight(1)
            .paddingInner(1)      // Padding between each rectangle
            //.paddingOuter(6)
            //.padding(20)
            .round(true)
            .tile(d3.treemapResquarify);
        this.treemap(root)

        this.updateTreeMap(root);
        // this.svg
        //     .selectAll("rect")
        //     .transition()
        //     .duration(1000)
        //     .attr('x', function(d) { return d.x0})
        //     .attr('y', function(d) { return d.y0})
        //     .attr('width', function(d) { return d.x1 - d.x0})
        //     .attr('height', function(d) { return d.y1 - d.y0})

    }
    wrapText(){
        this.svg.selectAll(".treemap_title").each(function(d,i){
            const self = d3.select(this);
            const containerWidth = d3.select(`#treemap_tile_${i}`).node().getBoundingClientRect().width;
            let fontSize = self.attr("font-size");
            let text = self.text()

            let textLength = self.node().getComputedTextLength();
            // const minFontSize = 12; // do not make font smaller than this
            let subString = 20;
            while(textLength > containerWidth){
                // first make the font smaller
                // if(fontSize >= minFontSize){
                fontSize = fontSize -1;
                textLength = self.node().getComputedTextLength();

                // }
                self.attr("font-size",fontSize);
                // then use less text;
                let newText = text.slice(0,subString) + "...";
                subString = subString - 1;
                self.text(newText);
            }
            // self.text("...")
        })
    }


    render() {
        return (
            <div style={{flex:1,display:'flex'}}>
                <div id={"treemap"} ref={(ref) => this.treeMapDiv = ref}>
                    <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => this.drawChart(w, h)}>
                    </ReactResizeDetector>
                </div>
            </div>

        )
    }
};


export default TreeMap;
